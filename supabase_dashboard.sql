-- ============================================================
-- Emergência Pro — Schema do dashboard de plantão (Fase B)
-- (idempotente — rode no SQL Editor depois das fases anteriores)
--
-- Estrutura:
--   1. Enums: conduct_status, pendencia_categoria
--   2. Tabela shifts (plantão manual: start/end)
--   3. reports ganha status_conduta, reavaliar_em, shift_id
--   4. Tabela report_pendencies (lista por relatório)
--   5. RPCs: start_shift, end_shift, current_shift, shift_dashboard,
--            add_pendencia, toggle_pendencia, update_report_meta
--   6. save_report_secure e load_reports_secure atualizados
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. Enums
-- ────────────────────────────────────────────────────────────

do $$ begin
  create type conduct_status as enum (
    'em_conduta', 'aguard_exames', 'aguard_vaga',
    'alta', 'transferencia', 'obito', 'recusa_terapeutica'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type pendencia_categoria as enum (
    'exame', 'medicacao', 'transferencia',
    'reavaliacao', 'consulta', 'outros'
  );
exception when duplicate_object then null;
end $$;


-- ────────────────────────────────────────────────────────────
-- 2. Tabela shifts (plantão)
-- ────────────────────────────────────────────────────────────

create table if not exists shifts (
  id          bigint primary key generated always as identity,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  started_at  timestamptz not null default now(),
  ended_at    timestamptz,
  notes       text,
  created_at  timestamptz default now()
);

create index if not exists shifts_user_active_idx
  on shifts(user_id) where ended_at is null;
create index if not exists shifts_user_started_idx
  on shifts(user_id, started_at desc);

alter table shifts enable row level security;

drop policy if exists "shifts_own_select" on shifts;
drop policy if exists "shifts_own_insert" on shifts;
drop policy if exists "shifts_own_update" on shifts;
drop policy if exists "shifts_own_delete" on shifts;

create policy "shifts_own_select" on shifts
  for select using (auth.uid() = user_id and is_approved());
create policy "shifts_own_insert" on shifts
  for insert with check (auth.uid() = user_id and is_approved());
create policy "shifts_own_update" on shifts
  for update
  using      (auth.uid() = user_id and is_approved())
  with check (auth.uid() = user_id and is_approved());
create policy "shifts_own_delete" on shifts
  for delete using (auth.uid() = user_id and is_approved());

grant select, insert, update, delete on shifts to authenticated;
grant usage, select on sequence shifts_id_seq to authenticated;

-- Audit
drop trigger if exists audit_shifts on shifts;
create trigger audit_shifts
  after insert or update or delete on shifts
  for each row execute procedure audit_trigger_fn();


-- ────────────────────────────────────────────────────────────
-- 3. reports ganha colunas
-- ────────────────────────────────────────────────────────────

alter table reports add column if not exists status_conduta conduct_status default 'em_conduta';
alter table reports add column if not exists reavaliar_em   timestamptz;
alter table reports add column if not exists shift_id       bigint references shifts(id) on delete set null;

create index if not exists reports_shift_idx          on reports(shift_id);
create index if not exists reports_status_idx         on reports(status_conduta);
create index if not exists reports_reavaliar_idx      on reports(reavaliar_em) where reavaliar_em is not null;


-- ────────────────────────────────────────────────────────────
-- 4. Tabela report_pendencies
-- ────────────────────────────────────────────────────────────

create table if not exists report_pendencies (
  id          bigint primary key generated always as identity,
  report_id   bigint not null references reports(id) on delete cascade,
  descricao   text   not null check (char_length(descricao) <= 500),
  prazo       timestamptz,
  categoria   pendencia_categoria not null default 'outros',
  done        boolean not null default false,
  done_at     timestamptz,
  created_at  timestamptz default now()
);

create index if not exists pendencies_report_idx on report_pendencies(report_id);
create index if not exists pendencies_open_idx   on report_pendencies(report_id) where done = false;

alter table report_pendencies enable row level security;

drop policy if exists "pend_select_via_report" on report_pendencies;
drop policy if exists "pend_insert_via_report" on report_pendencies;
drop policy if exists "pend_update_via_report" on report_pendencies;
drop policy if exists "pend_delete_via_report" on report_pendencies;

create policy "pend_select_via_report" on report_pendencies
  for select using (
    is_approved()
    and exists (select 1 from reports r where r.id = report_id and r.user_id = auth.uid())
  );
create policy "pend_insert_via_report" on report_pendencies
  for insert with check (
    is_approved()
    and exists (select 1 from reports r where r.id = report_id and r.user_id = auth.uid())
  );
create policy "pend_update_via_report" on report_pendencies
  for update
  using (
    is_approved()
    and exists (select 1 from reports r where r.id = report_id and r.user_id = auth.uid())
  )
  with check (
    is_approved()
    and exists (select 1 from reports r where r.id = report_id and r.user_id = auth.uid())
  );
create policy "pend_delete_via_report" on report_pendencies
  for delete using (
    is_approved()
    and exists (select 1 from reports r where r.id = report_id and r.user_id = auth.uid())
  );

grant select, insert, update, delete on report_pendencies to authenticated;
grant usage, select on sequence report_pendencies_id_seq to authenticated;

drop trigger if exists audit_pendencies on report_pendencies;
create trigger audit_pendencies
  after insert or update or delete on report_pendencies
  for each row execute procedure audit_trigger_fn();


-- ────────────────────────────────────────────────────────────
-- 5. RPCs do plantão
-- ────────────────────────────────────────────────────────────

-- 5a. start_shift: encerra qualquer plantão ativo e abre um novo
create or replace function start_shift(p_notes text default null)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_id  bigint;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;

  -- fecha qualquer shift ativo do user (com timestamp atual)
  update shifts set ended_at = now()
   where user_id = v_uid and ended_at is null;

  insert into shifts (user_id, notes) values (v_uid, p_notes)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function start_shift(text) from public, anon;
grant execute on function start_shift(text) to authenticated;


-- 5b. end_shift: encerra o plantão ativo do user
create or replace function end_shift(p_notes text default null)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_id  bigint;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;

  update shifts
     set ended_at = now(),
         notes    = coalesce(p_notes, notes)
   where user_id = v_uid and ended_at is null
   returning id into v_id;

  return v_id;
end;
$$;

revoke all on function end_shift(text) from public, anon;
grant execute on function end_shift(text) to authenticated;


-- 5c. current_shift: retorna o shift ativo do user (ou null)
create or replace function current_shift()
returns table (
  id         bigint,
  started_at timestamptz,
  ended_at   timestamptz,
  notes      text
)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;

  return query
    select s.id, s.started_at, s.ended_at, s.notes
      from shifts s
     where s.user_id = v_uid and s.ended_at is null
     order by s.started_at desc
     limit 1;
end;
$$;

revoke all on function current_shift() from public, anon;
grant execute on function current_shift() to authenticated;


-- 5d. shift_dashboard: shift + pacientes (com pendências aninhadas)
--     Se p_shift_id é null, usa o shift ativo do user.
create or replace function shift_dashboard(p_shift_id bigint default null)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid       uuid := auth.uid();
  v_shift_id  bigint;
  v_shift     json;
  v_pacientes json;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;

  if p_shift_id is null then
    select id into v_shift_id
      from shifts
     where user_id = v_uid and ended_at is null
     order by started_at desc limit 1;
  else
    if not exists (select 1 from shifts where id = p_shift_id and user_id = v_uid) then
      raise exception 'Plantão não encontrado';
    end if;
    v_shift_id := p_shift_id;
  end if;

  if v_shift_id is null then
    return json_build_object('shift', null, 'pacientes', '[]'::json);
  end if;

  select to_jsonb(s) into v_shift from shifts s where s.id = v_shift_id;

  select coalesce(json_agg(p order by p.created_at), '[]'::json) into v_pacientes
    from (
      select
        r.id, r.key, r.nome, r.queixa, r.report_date,
        r.status_conduta, r.reavaliar_em, r.created_at,
        coalesce(
          (select json_agg(to_jsonb(pn) order by pn.done, pn.prazo nulls last, pn.created_at)
             from report_pendencies pn where pn.report_id = r.id),
          '[]'::json
        ) as pendencias
      from reports r
      where r.shift_id = v_shift_id and r.user_id = v_uid
    ) p;

  return json_build_object('shift', v_shift, 'pacientes', v_pacientes);
end;
$$;

revoke all on function shift_dashboard(bigint) from public, anon;
grant execute on function shift_dashboard(bigint) to authenticated;


-- 5e. add_pendencia
create or replace function add_pendencia(
  p_report_id bigint,
  p_descricao text,
  p_prazo     timestamptz default null,
  p_categoria pendencia_categoria default 'outros'
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_id  bigint;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;
  if not exists (select 1 from reports where id = p_report_id and user_id = v_uid) then
    raise exception 'Relatório não encontrado';
  end if;
  if p_descricao is null or char_length(trim(p_descricao)) = 0 then
    raise exception 'Descrição obrigatória';
  end if;

  insert into report_pendencies (report_id, descricao, prazo, categoria)
  values (p_report_id, trim(p_descricao), p_prazo, p_categoria)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function add_pendencia(bigint, text, timestamptz, pendencia_categoria) from public, anon;
grant execute on function add_pendencia(bigint, text, timestamptz, pendencia_categoria) to authenticated;


-- 5f. toggle_pendencia: marca/desmarca como done
create or replace function toggle_pendencia(p_id bigint)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid     uuid := auth.uid();
  v_done    boolean;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;

  -- segurança: confirma ownership do report
  if not exists (
    select 1 from report_pendencies pn
    join reports r on r.id = pn.report_id
    where pn.id = p_id and r.user_id = v_uid
  ) then
    raise exception 'Pendência não encontrada';
  end if;

  update report_pendencies
     set done    = not done,
         done_at = case when not done then now() else null end
   where id = p_id
   returning done into v_done;

  return v_done;
end;
$$;

revoke all on function toggle_pendencia(bigint) from public, anon;
grant execute on function toggle_pendencia(bigint) to authenticated;


-- 5g. delete_pendencia
create or replace function delete_pendencia(p_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;

  delete from report_pendencies pn
   using reports r
   where pn.id = p_id and pn.report_id = r.id and r.user_id = v_uid;
end;
$$;

revoke all on function delete_pendencia(bigint) from public, anon;
grant execute on function delete_pendencia(bigint) to authenticated;


-- 5h. update_report_meta: status_conduta e/ou reavaliar_em
create or replace function update_report_meta(
  p_id              bigint,
  p_status_conduta  conduct_status default null,
  p_reavaliar_em    timestamptz    default null,
  p_clear_reavaliar boolean        default false
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;
  if not is_approved() then raise exception 'Conta não aprovada'; end if;
  if not exists (select 1 from reports where id = p_id and user_id = v_uid) then
    raise exception 'Relatório não encontrado';
  end if;

  update reports
     set status_conduta = coalesce(p_status_conduta, status_conduta),
         reavaliar_em   = case
                            when p_clear_reavaliar then null
                            when p_reavaliar_em is not null then p_reavaliar_em
                            else reavaliar_em
                          end
   where id = p_id;
end;
$$;

revoke all on function update_report_meta(bigint, conduct_status, timestamptz, boolean) from public, anon;
grant execute on function update_report_meta(bigint, conduct_status, timestamptz, boolean) to authenticated;


-- ────────────────────────────────────────────────────────────
-- 6. save_report_secure atualizada (compatível para trás)
-- ────────────────────────────────────────────────────────────
-- Frontend antigo passa 5 args; defaults preenchem os 3 novos.
-- Drop necessário pois RETURNS continua bigint mas signature muda.

drop function if exists save_report_secure(text, text, text, text, text);

create or replace function save_report_secure(
  p_key             text,
  p_nome            text,
  p_queixa          text,
  p_date            text,
  p_txt             text,
  p_shift_id        bigint          default null,
  p_status_conduta  conduct_status  default 'em_conduta',
  p_reavaliar_em    timestamptz     default null
)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_uid    uuid := auth.uid();
  v_status user_status;
  v_keyhex text;
  v_ct     bytea;
  v_id     bigint;
  v_shift  bigint := p_shift_id;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;

  select status into v_status from profiles where id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  -- se shift não foi passado, tenta associar ao shift ativo
  if v_shift is null then
    select id into v_shift from shifts
     where user_id = v_uid and ended_at is null
     order by started_at desc limit 1;
  else
    -- valida ownership do shift informado
    if not exists (select 1 from shifts where id = v_shift and user_id = v_uid) then
      raise exception 'Plantão não encontrado';
    end if;
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);
  v_ct     := extensions.pgp_sym_encrypt(p_txt, v_keyhex, 'cipher-algo=aes256, compress-algo=0');

  insert into reports (
    user_id, key, nome, queixa, report_date, txt, txt_enc,
    shift_id, status_conduta, reavaliar_em
  ) values (
    v_uid, p_key, p_nome, p_queixa, p_date, null, v_ct,
    v_shift, p_status_conduta, p_reavaliar_em
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz) from public, anon;
grant execute on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz) to authenticated;


-- ────────────────────────────────────────────────────────────
-- 7. load_reports_secure atualizada (novas colunas)
-- ────────────────────────────────────────────────────────────

drop function if exists load_reports_secure();

create or replace function load_reports_secure()
returns table (
  id              bigint,
  key             text,
  nome            text,
  queixa          text,
  report_date     text,
  txt             text,
  status_conduta  conduct_status,
  reavaliar_em    timestamptz,
  shift_id        bigint,
  created_at      timestamptz
)
language plpgsql
security definer
set search_path = public, extensions
as $$
#variable_conflict use_column
declare
  v_uid    uuid := auth.uid();
  v_status user_status;
  v_keyhex text;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;

  select p.status into v_status from profiles p where p.id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);

  return query
  select
    r.id, r.key, r.nome, r.queixa, r.report_date,
    case
      when r.txt_enc is not null then extensions.pgp_sym_decrypt(r.txt_enc, v_keyhex)
      else r.txt
    end,
    r.status_conduta,
    r.reavaliar_em,
    r.shift_id,
    r.created_at
  from reports r
  where r.user_id = v_uid
  order by r.created_at desc;
end;
$$;

revoke all on function load_reports_secure() from public, anon;
grant execute on function load_reports_secure() to authenticated;


-- ============================================================
-- FIM
-- ============================================================
