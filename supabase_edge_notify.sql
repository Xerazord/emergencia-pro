-- ============================================================
-- Emergência Pro — Trigger pg_net que chama a Edge Function
-- (idempotente — rode no SQL Editor depois de deployar a function)
--
-- Pré-requisitos antes de rodar este SQL:
--   1. supabase functions deploy notify-admin-pending
--   2. supabase secrets set RESEND_API_KEY=re_...
--   3. Habilitar extensão pg_net em Database → Extensions
--   4. Criar dois secrets no vault (substituir valores):
--        select vault.create_secret(
--          'https://<PROJECT_REF>.supabase.co/functions/v1/notify-admin-pending',
--          'EDGE_FN_NOTIFY_URL', 'URL da edge function de notificação');
--        select vault.create_secret(
--          '<ANON_OU_SERVICE_ROLE_KEY>',
--          'EDGE_FN_NOTIFY_AUTH', 'Authorization Bearer para a edge function');
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. Extensão pg_net (HTTP requests do Postgres)
-- ────────────────────────────────────────────────────────────

create extension if not exists pg_net with schema extensions;


-- ────────────────────────────────────────────────────────────
-- 2. Função que enfileira a chamada HTTP
-- ────────────────────────────────────────────────────────────
-- net.http_post é assíncrono (fire-and-forget). Se o HTTP falhar,
-- não bloqueia o UPDATE em profiles.

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
begin
  -- Dispara apenas quando:
  --   - status é 'pending'
  --   - KYC foi COMPLETADO agora (nome+crm+selfie+crm_doc todos preenchidos)
  --   - antes do UPDATE, pelo menos um campo de KYC estava null
  --     (evita re-enviar a cada update subsequente do mesmo profile)
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
    select decrypted_secret into v_url  from vault.decrypted_secrets where name = 'EDGE_FN_NOTIFY_URL'  limit 1;
    select decrypted_secret into v_auth from vault.decrypted_secrets where name = 'EDGE_FN_NOTIFY_AUTH' limit 1;

    if v_url is null then
      -- Configuração faltando: log e sai sem falhar
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
  end if;

  return NEW;
end;
$$;

revoke all on function notify_admin_new_pending() from public, anon, authenticated;


-- ────────────────────────────────────────────────────────────
-- 3. Trigger AFTER UPDATE em profiles
-- ────────────────────────────────────────────────────────────

drop trigger if exists trg_notify_admin_pending on profiles;
create trigger trg_notify_admin_pending
  after update on profiles
  for each row execute procedure notify_admin_new_pending();


-- ============================================================
-- Como testar manualmente (depois de tudo configurado):
--   update profiles
--      set selfie_path = null
--    where email = 'teste@example.com';   -- "abre" KYC
--   update profiles
--      set selfie_path = 'teste/selfie.jpg'
--    where email = 'teste@example.com';   -- dispara notificação
-- ============================================================
