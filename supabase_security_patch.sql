-- ============================================================
-- Emergência Pro — Patch de segurança (Fase A1)
-- (idempotente — rode no SQL Editor)
--
-- Correções:
--   1. delete_report_secure: gate em is_approved()
--   2. reports.user_id: ON DELETE CASCADE
--   3. audit_trigger_fn: filtra txt_enc/txt de reports (evita
--      duplicar ciphertext em audit_log e vazar tamanho)
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. delete_report_secure: bloqueia users não-approved
-- ────────────────────────────────────────────────────────────

create or replace function delete_report_secure(p_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid    uuid := auth.uid();
  v_status user_status;
begin
  if v_uid is null then
    raise exception 'Não autenticado';
  end if;

  select status into v_status from profiles where id = v_uid;
  if v_status is distinct from 'approved' then
    raise exception 'Conta não aprovada (status=%)', coalesce(v_status::text, 'null');
  end if;

  delete from reports where id = p_id and user_id = v_uid;
end;
$$;

revoke all on function delete_report_secure(bigint) from public, anon;
grant execute on function delete_report_secure(bigint) to authenticated;


-- ────────────────────────────────────────────────────────────
-- 2. reports.user_id → ON DELETE CASCADE
-- ────────────────────────────────────────────────────────────
-- Permite excluir usuário em auth.users sem erro de FK; reports
-- do usuário deletado são removidos junto.

alter table reports drop constraint if exists reports_user_id_fkey;
alter table reports
  add constraint reports_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;


-- ────────────────────────────────────────────────────────────
-- 3. audit_trigger_fn: filtra txt_enc/txt em reports
-- ────────────────────────────────────────────────────────────
-- Sem o filtro, cada save/delete duplica o ciphertext inteiro em
-- audit_log.before/after. O log de auditoria deve ter apenas
-- metadados (id, user_id, key, nome, queixa, datas).

create or replace function audit_trigger_fn()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_action text;
  v_before jsonb;
  v_after  jsonb;
  v_row_id text;
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
  else  -- UPDATE
    v_before := to_jsonb(old);
    v_after  := to_jsonb(new);
    v_row_id := new.id::text;
  end if;

  -- Em reports, remover colunas que carregam PHI (cifrada ou plain)
  if tg_table_name = 'reports' then
    if v_before is not null then
      v_before := v_before - 'txt_enc' - 'txt';
    end if;
    if v_after is not null then
      v_after  := v_after  - 'txt_enc' - 'txt';
    end if;
  end if;

  insert into audit_log (user_id, table_name, action, row_id, before, after)
  values (auth.uid(), tg_table_name, v_action, v_row_id, v_before, v_after);

  return coalesce(new, old);
end;
$$;


-- ============================================================
-- FIM
-- ============================================================
