-- ============================================================
-- Emergência Pro — Patch dashboard v2 (idade + sexo)
-- (idempotente — rode no SQL Editor depois de supabase_dashboard.sql)
--
-- Adiciona:
--   - reports.idade  (integer, 0..130)
--   - reports.sexo   (char(1) — M/F/O)
--   - save_report_secure: novos params p_idade, p_sexo
--   - load_reports_secure: novas colunas idade, sexo
--   - shift_dashboard: inclui idade e sexo nos pacientes
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. Colunas em reports
-- ────────────────────────────────────────────────────────────

alter table reports add column if not exists idade integer
  check (idade is null or (idade >= 0 and idade <= 130));
alter table reports add column if not exists sexo  char(1)
  check (sexo is null or sexo in ('M','F','O'));


-- ────────────────────────────────────────────────────────────
-- 2. save_report_secure (novos params no fim, com default null)
-- ────────────────────────────────────────────────────────────

drop function if exists save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz);

create or replace function save_report_secure(
  p_key             text,
  p_nome            text,
  p_queixa          text,
  p_date            text,
  p_txt             text,
  p_shift_id        bigint          default null,
  p_status_conduta  conduct_status  default 'em_conduta',
  p_reavaliar_em    timestamptz     default null,
  p_idade           integer         default null,
  p_sexo            char(1)         default null
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

  if v_shift is null then
    select id into v_shift from shifts
     where user_id = v_uid and ended_at is null
     order by started_at desc limit 1;
  else
    if not exists (select 1 from shifts where id = v_shift and user_id = v_uid) then
      raise exception 'Plantão não encontrado';
    end if;
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);
  v_ct     := extensions.pgp_sym_encrypt(p_txt, v_keyhex, 'cipher-algo=aes256, compress-algo=0');

  insert into reports (
    user_id, key, nome, queixa, report_date, txt, txt_enc,
    shift_id, status_conduta, reavaliar_em, idade, sexo
  ) values (
    v_uid, p_key, p_nome, p_queixa, p_date, null, v_ct,
    v_shift, p_status_conduta, p_reavaliar_em, p_idade, p_sexo
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz, integer, char) from public, anon;
grant execute on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz, integer, char) to authenticated;


-- ────────────────────────────────────────────────────────────
-- 3. load_reports_secure (novas colunas)
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
  idade           integer,
  sexo            char(1),
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
    r.status_conduta, r.reavaliar_em, r.shift_id,
    r.idade, r.sexo,
    r.created_at
  from reports r
  where r.user_id = v_uid
  order by r.created_at desc;
end;
$$;

revoke all on function load_reports_secure() from public, anon;
grant execute on function load_reports_secure() to authenticated;


-- ────────────────────────────────────────────────────────────
-- 4. shift_dashboard — inclui idade e sexo
-- ────────────────────────────────────────────────────────────

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
        r.idade, r.sexo,
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


-- ============================================================
-- FIM
-- ============================================================
