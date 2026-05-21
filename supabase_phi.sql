-- ============================================================
-- Emergência Pro — Cifragem PHI de reports.txt
-- (idempotente — rode no SQL Editor depois de supabase_setup.sql)
--
-- Estratégia:
--   - Chave master em vault.secrets (gerada uma vez, server-side)
--   - Chave derivada por usuário: HMAC-SHA256(user_id, master) = 32 bytes
--   - Cifragem: pgcrypto.pgp_sym_encrypt com AES-256-CFB + SHA-1 MDC (integrity)
--   - reports.txt → reports.txt_enc (bytea)
--   - RPCs save_report_secure / load_reports_secure / delete_report_secure
--   - Coluna texto plain (txt) preservada nullable durante migração;
--     remova manualmente depois de validar.
--
-- Nota de threat model:
--   - RLS por user_id já isola dados entre users.
--   - Chave-por-user impede que um row de user A seja decifrado com chave de user B.
--   - Não cobre: troca maliciosa de bytea entre rows DO MESMO usuário (admin DB).
--     Para isso seria necessário AAD/binding com row id — adicionar em v2 se relevante.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- A. Extensões
-- ────────────────────────────────────────────────────────────

create extension if not exists pgcrypto with schema extensions;


-- ────────────────────────────────────────────────────────────
-- B. Master key no Vault
-- ────────────────────────────────────────────────────────────
-- Gera uma chave de 32 bytes na primeira execução e armazena
-- no vault.secrets sob o nome 'REPORT_MASTER_KEY'.
-- Idempotente: só cria se ainda não existir.

do $$
declare
  v_exists boolean;
  v_keyb64 text;
begin
  select exists(
    select 1 from vault.secrets where name = 'REPORT_MASTER_KEY'
  ) into v_exists;

  if not v_exists then
    v_keyb64 := encode(extensions.gen_random_bytes(32), 'base64');
    perform vault.create_secret(v_keyb64, 'REPORT_MASTER_KEY', 'Master key para cifragem de reports.txt');
  end if;
end $$;


-- ────────────────────────────────────────────────────────────
-- C. Funções internas (não expostas via API REST)
-- ────────────────────────────────────────────────────────────

-- Lê a master key do Vault (decifrada) e retorna como bytea
create or replace function _report_master_key()
returns bytea
language plpgsql
security definer
set search_path = vault, public
as $$
declare
  v_b64 text;
begin
  select decrypted_secret into v_b64
  from vault.decrypted_secrets
  where name = 'REPORT_MASTER_KEY'
  limit 1;

  if v_b64 is null then
    raise exception 'REPORT_MASTER_KEY não encontrada no vault';
  end if;

  return decode(v_b64, 'base64');
end;
$$;

revoke all on function _report_master_key() from public, anon, authenticated;


-- Deriva chave de 32 bytes específica do usuário: HMAC-SHA256(user_id, key=master)
-- Retorna como text (hex) porque pgp_sym_encrypt espera password como text.
create or replace function _derive_user_key_hex(p_user_id uuid)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_master bytea;
begin
  v_master := _report_master_key();
  return encode(
    extensions.hmac(convert_to(p_user_id::text, 'UTF8'), v_master, 'sha256'::text),
    'hex'
  );
end;
$$;

revoke all on function _derive_user_key_hex(uuid) from public, anon, authenticated;


-- ────────────────────────────────────────────────────────────
-- D. Coluna cifrada em reports
-- ────────────────────────────────────────────────────────────

alter table reports add column if not exists txt_enc bytea;

-- Remove coluna de nonce se existir (resíduo de tentativa anterior com pgsodium)
alter table reports drop column if exists txt_nonce;

-- txt continua nullable para coexistência durante migração;
-- após validar, rode manualmente: alter table reports drop column txt;


-- ────────────────────────────────────────────────────────────
-- E. RPC: save_report_secure
--    Cifra txt e insere registro. Retorna id do report.
-- ────────────────────────────────────────────────────────────

create or replace function save_report_secure(
  p_key    text,
  p_nome   text,
  p_queixa text,
  p_date   text,
  p_txt    text
)
returns bigint
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_uid     uuid := auth.uid();
  v_status  user_status;
  v_keyhex  text;
  v_ct      bytea;
  v_id      bigint;
begin
  if v_uid is null then
    raise exception 'Não autenticado';
  end if;

  select status into v_status from profiles where id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);
  v_ct     := extensions.pgp_sym_encrypt(p_txt, v_keyhex, 'cipher-algo=aes256, compress-algo=0');

  insert into reports (user_id, key, nome, queixa, report_date, txt, txt_enc)
  values (v_uid, p_key, p_nome, p_queixa, p_date, null, v_ct)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function save_report_secure(text, text, text, text, text) from public, anon;
grant execute on function save_report_secure(text, text, text, text, text) to authenticated;


-- ────────────────────────────────────────────────────────────
-- F. RPC: load_reports_secure
--    Retorna reports do usuário com txt decifrado.
-- ────────────────────────────────────────────────────────────

create or replace function load_reports_secure()
returns table (
  id          bigint,
  key         text,
  nome        text,
  queixa      text,
  report_date text,
  txt         text,
  created_at  timestamptz
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
  if v_uid is null then
    raise exception 'Não autenticado';
  end if;

  select p.status into v_status from profiles p where p.id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  v_keyhex := _derive_user_key_hex(v_uid);

  return query
  select
    r.id,
    r.key,
    r.nome,
    r.queixa,
    r.report_date,
    case
      when r.txt_enc is not null then extensions.pgp_sym_decrypt(r.txt_enc, v_keyhex)
      else r.txt
    end,
    r.created_at
  from reports r
  where r.user_id = v_uid
  order by r.created_at desc;
end;
$$;

revoke all on function load_reports_secure() from public, anon;
grant execute on function load_reports_secure() to authenticated;


-- ────────────────────────────────────────────────────────────
-- G. RPC: delete_report_secure
-- ────────────────────────────────────────────────────────────

create or replace function delete_report_secure(p_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'Não autenticado';
  end if;

  delete from reports where id = p_id and user_id = v_uid;
end;
$$;

revoke all on function delete_report_secure(bigint) from public, anon;
grant execute on function delete_report_secure(bigint) to authenticated;


-- ────────────────────────────────────────────────────────────
-- H. Migração de dados existentes (txt → txt_enc)
--    Idempotente: só cifra rows que ainda têm txt e não têm txt_enc.
-- ────────────────────────────────────────────────────────────

do $$
declare
  r        record;
  v_keyhex text;
  v_ct     bytea;
begin
  for r in
    select id, user_id, txt
    from reports
    where txt is not null and txt_enc is null
  loop
    v_keyhex := _derive_user_key_hex(r.user_id);
    v_ct     := extensions.pgp_sym_encrypt(r.txt, v_keyhex, 'cipher-algo=aes256, compress-algo=0');

    update reports
       set txt_enc = v_ct,
           txt     = null
     where id = r.id;
  end loop;
end $$;


-- ============================================================
-- FIM. Após validar que load_reports_secure() retorna os textos
-- decifrados corretamente via app, rode manualmente:
--   alter table reports drop column txt;
-- ============================================================
