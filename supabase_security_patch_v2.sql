-- ============================================================
-- Emergência Pro — Patch de segurança v2 (Sonnet + Haiku)
-- (idempotente — rode no SQL Editor)
--
-- Correções aplicadas:
--   1. [HIGH] Impersonation: estende protect_profile_admin_fields
--      para travar nome_completo/crm/crm_uf/especialidade/telefone/
--      selfie_path/crm_doc_path SOMENTE quando OLD.status='approved'
--      (antes da aprovação, user pode corrigir erros no KYC)
--   2. [MED] reports.txt plaintext bypass: recriar RPCs sem
--      referência a txt e dropar a coluna
--   3. [MED] PHI no audit_log: filtra nome/queixa/idade/sexo/
--      sinais_vitais além de txt_enc/txt em reports
--   4. [MED] Notification DoS: debounce 60min via tabela
--      kyc_notifications + lógica no trigger pg_net
--   5. [LOW] update_report_meta sem user_id no WHERE: adicionado
--   6. [LOW] CRM sem CHECK constraint server-side: adicionado
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. [HIGH] Lock de campos KYC após aprovação
-- ────────────────────────────────────────────────────────────

create or replace function protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and not is_admin() then
    -- Campos administrativos sempre protegidos
    new.status            := old.status;
    new.role              := old.role;
    new.aprovado_por      := old.aprovado_por;
    new.aprovado_em       := old.aprovado_em;
    new.motivo_rejeicao   := old.motivo_rejeicao;

    -- Campos identitários protegidos APENAS após aprovação
    -- (antes da aprovação user pode corrigir erros de digitação no KYC)
    if old.status = 'approved' then
      new.nome_completo := old.nome_completo;
      new.crm           := old.crm;
      new.crm_uf        := old.crm_uf;
      new.especialidade := old.especialidade;
      new.telefone      := old.telefone;
      new.selfie_path   := old.selfie_path;
      new.crm_doc_path  := old.crm_doc_path;
    end if;
  end if;
  return new;
end;
$$;


-- ────────────────────────────────────────────────────────────
-- 2. [MED] Recriar RPCs sem r.txt antes de dropar a coluna
-- ────────────────────────────────────────────────────────────

-- 2a. save_report_secure: remove referência a txt no INSERT
drop function if exists save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz, integer, char, jsonb, text);

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
  p_sexo            char(1)         default null,
  p_sinais_vitais   jsonb           default null,
  p_sind_label      text            default null
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
    user_id, key, nome, queixa, report_date, txt_enc,
    shift_id, status_conduta, reavaliar_em, idade, sexo,
    sinais_vitais, sind_label
  ) values (
    v_uid, p_key, p_nome, p_queixa, p_date, v_ct,
    v_shift, p_status_conduta, p_reavaliar_em, p_idade, p_sexo,
    p_sinais_vitais, p_sind_label
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz, integer, char, jsonb, text) from public, anon;
grant execute on function save_report_secure(text, text, text, text, text, bigint, conduct_status, timestamptz, integer, char, jsonb, text) to authenticated;


-- 2b. load_reports_secure: case sem fallback para r.txt
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
  sinais_vitais   jsonb,
  sind_label      text,
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
    case when r.txt_enc is not null then extensions.pgp_sym_decrypt(r.txt_enc, v_keyhex) else null end,
    r.status_conduta, r.reavaliar_em, r.shift_id,
    r.idade, r.sexo, r.sinais_vitais, r.sind_label,
    r.created_at
  from reports r
  where r.user_id = v_uid
  order by r.created_at desc;
end;
$$;

revoke all on function load_reports_secure() from public, anon;
grant execute on function load_reports_secure() to authenticated;


-- 2c. load_report_text: remove fallback v_plain (r.txt)
create or replace function load_report_text(p_id bigint)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_uid    uuid := auth.uid();
  v_status user_status;
  v_keyhex text;
  v_enc    bytea;
begin
  if v_uid is null then raise exception 'Não autenticado'; end if;

  select p.status into v_status from profiles p where p.id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  select r.txt_enc into v_enc
    from reports r
   where r.id = p_id and r.user_id = v_uid;

  if v_enc is null then
    raise exception 'Relatório não encontrado';
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);
  return extensions.pgp_sym_decrypt(v_enc, v_keyhex);
end;
$$;

revoke all on function load_report_text(bigint) from public, anon;
grant execute on function load_report_text(bigint) to authenticated;


-- 2d. Agora pode dropar a coluna txt com segurança
alter table reports drop column if exists txt;


-- ────────────────────────────────────────────────────────────
-- 3. [MED] audit_trigger_fn: filtrar mais PHI em reports
-- ────────────────────────────────────────────────────────────

create or replace function audit_trigger_fn()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_action  text;
  v_before  jsonb;
  v_after   jsonb;
  v_row_id  text;
begin
  v_action := lower(tg_op);

  if tg_op = 'DELETE' then
    v_before := to_jsonb(old);
    v_after  := null;
    v_row_id := old.id::text;
  elsif tg_op = 'INSERT' then
    v_before := null;
    v_after  := to_jsonb(new);
    v_row_id := new.id::text;
  else
    v_before := to_jsonb(old);
    v_after  := to_jsonb(new);
    v_row_id := new.id::text;
  end if;

  -- Em reports, remover TODOS os campos com PHI
  -- (mantém id, user_id, key, shift_id, status_conduta, report_date, sind_label, timestamps)
  if tg_table_name = 'reports' then
    if v_before is not null then
      v_before := v_before
        - 'txt_enc' - 'txt'
        - 'nome' - 'queixa'
        - 'idade' - 'sexo'
        - 'sinais_vitais';
    end if;
    if v_after is not null then
      v_after := v_after
        - 'txt_enc' - 'txt'
        - 'nome' - 'queixa'
        - 'idade' - 'sexo'
        - 'sinais_vitais';
    end if;
  end if;

  insert into audit_log (user_id, table_name, action, row_id, before, after)
  values (auth.uid(), tg_table_name, v_action, v_row_id, v_before, v_after);

  return coalesce(new, old);
end;
$$;


-- ────────────────────────────────────────────────────────────
-- 4. [MED] Notification debounce — tabela kyc_notifications + trigger
-- ────────────────────────────────────────────────────────────

create table if not exists kyc_notifications (
  profile_id       uuid primary key references profiles(id) on delete cascade,
  last_notified_at timestamptz not null default now()
);

alter table kyc_notifications enable row level security;
-- Sem policy: só o trigger SECURITY DEFINER acessa.

create or replace function notify_admin_new_pending()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault, net
as $$
declare
  v_url     text;
  v_auth    text;
  v_payload jsonb;
  v_last    timestamptz;
begin
  if NEW.status = 'pending'
     and NEW.nome_completo is not null
     and NEW.crm           is not null
     and NEW.selfie_path   is not null
     and NEW.crm_doc_path  is not null
     and (
       OLD.nome_completo is null or
       OLD.crm           is null or
       OLD.selfie_path   is null or
       OLD.crm_doc_path  is null
     )
  then
    -- Debounce: não disparar se já notificou nas últimas 60 min
    select last_notified_at into v_last
      from kyc_notifications
     where profile_id = NEW.id;

    if v_last is not null and v_last > now() - interval '60 minutes' then
      raise notice 'Notificação suprimida — última envio em % minutos atrás',
        extract(epoch from now() - v_last) / 60;
      return NEW;
    end if;

    select decrypted_secret into v_url
      from vault.decrypted_secrets where name = 'EDGE_FN_NOTIFY_URL' limit 1;
    select decrypted_secret into v_auth
      from vault.decrypted_secrets where name = 'EDGE_FN_NOTIFY_AUTH' limit 1;

    if v_url is null then
      raise notice 'EDGE_FN_NOTIFY_URL não configurada no vault — pulando notificação';
      return NEW;
    end if;

    v_payload := jsonb_build_object(
      'profile_id',            NEW.id,
      'profile_email',         NEW.email,
      'profile_nome',          NEW.nome_completo,
      'profile_crm',           NEW.crm,
      'profile_crm_uf',        NEW.crm_uf,
      'profile_especialidade', NEW.especialidade,
      'event',                 'kyc_completed'
    );

    perform net.http_post(
      url := v_url,
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer ' || coalesce(v_auth, '')
      ),
      body := v_payload
    );

    insert into kyc_notifications (profile_id, last_notified_at)
    values (NEW.id, now())
    on conflict (profile_id) do update set last_notified_at = excluded.last_notified_at;
  end if;

  return NEW;
end;
$$;

revoke all on function notify_admin_new_pending() from public, anon, authenticated;


-- ────────────────────────────────────────────────────────────
-- 5. [LOW] update_report_meta: filtro user_id no WHERE
-- ────────────────────────────────────────────────────────────

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
   where id      = p_id
     and user_id = v_uid;  -- defense-in-depth: filtro repetido
end;
$$;


-- ────────────────────────────────────────────────────────────
-- 6. [LOW] CHECK constraint server-side em profiles.crm
-- ────────────────────────────────────────────────────────────

-- Antes de adicionar a constraint, verifica se há rows que violariam
do $$
declare
  v_bad int;
begin
  select count(*) into v_bad from profiles where crm is not null and crm !~ '^[0-9]{3,7}$';
  if v_bad > 0 then
    raise notice 'AVISO: % row(s) em profiles têm CRM com formato inválido. Constraint não foi adicionada.', v_bad;
  else
    -- Drop antes de adicionar para idempotência
    execute 'alter table profiles drop constraint if exists profiles_crm_format';
    execute 'alter table profiles add constraint profiles_crm_format check (crm is null or crm ~ ''^[0-9]{3,7}$'')';
  end if;
end $$;


-- ============================================================
-- FIM
-- ============================================================
