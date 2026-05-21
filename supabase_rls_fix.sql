-- ============================================================
-- Emergência Pro — Fix de recursão RLS em policies que consultam profiles
-- (idempotente — rode no SQL Editor)
--
-- Problema: várias policies fazem EXISTS (SELECT FROM profiles ...)
-- para checar se o usuário é admin/approved. Como profiles tem RLS,
-- esse SELECT dispara a policy de profiles, que faz outro SELECT em
-- profiles, etc. → infinite recursion.
--
-- Solução: funções helper is_admin() e is_approved() com
-- SECURITY DEFINER, que rodam como postgres (bypassrls=true).
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. Funções helper
-- ────────────────────────────────────────────────────────────

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select role = 'admin' from profiles where id = auth.uid()), false);
$$;

create or replace function is_approved()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select status = 'approved' from profiles where id = auth.uid()), false);
$$;

revoke all on function is_admin()     from public, anon;
revoke all on function is_approved()  from public, anon;
grant execute on function is_admin()    to authenticated;
grant execute on function is_approved() to authenticated;


-- ────────────────────────────────────────────────────────────
-- 2. Policies em profiles (substitui EXISTS recursivos)
-- ────────────────────────────────────────────────────────────

drop policy if exists "profiles_select_own_or_admin" on profiles;
create policy "profiles_select_own_or_admin" on profiles
  for select using (auth.uid() = id or is_admin());

drop policy if exists "profiles_update_admin" on profiles;
create policy "profiles_update_admin" on profiles
  for update using (is_admin());


-- ────────────────────────────────────────────────────────────
-- 3. Policies em reports
-- ────────────────────────────────────────────────────────────

drop policy if exists "own_select" on reports;
create policy "own_select" on reports
  for select using (auth.uid() = user_id and is_approved());

drop policy if exists "own_insert" on reports;
create policy "own_insert" on reports
  for insert with check (auth.uid() = user_id and is_approved());

drop policy if exists "own_update" on reports;
create policy "own_update" on reports
  for update
  using      (auth.uid() = user_id and is_approved())
  with check (auth.uid() = user_id and is_approved());

drop policy if exists "own_delete" on reports;
create policy "own_delete" on reports
  for delete using (auth.uid() = user_id and is_approved());


-- ────────────────────────────────────────────────────────────
-- 4. Policies em audit_log
-- ────────────────────────────────────────────────────────────

drop policy if exists "audit_select_admin_only" on audit_log;
create policy "audit_select_admin_only" on audit_log
  for select using (is_admin());


-- ────────────────────────────────────────────────────────────
-- 5. Policies em storage.objects (bucket kyc-docs)
-- ────────────────────────────────────────────────────────────

drop policy if exists "kyc_select_owner_or_admin" on storage.objects;
create policy "kyc_select_owner_or_admin" on storage.objects
  for select using (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

drop policy if exists "kyc_insert_owner_or_admin" on storage.objects;
create policy "kyc_insert_owner_or_admin" on storage.objects
  for insert with check (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

drop policy if exists "kyc_update_owner_or_admin" on storage.objects;
create policy "kyc_update_owner_or_admin" on storage.objects
  for update using (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

drop policy if exists "kyc_delete_admin_only" on storage.objects;
create policy "kyc_delete_admin_only" on storage.objects
  for delete using (
    bucket_id = 'kyc-docs'
    and is_admin()
  );


-- ────────────────────────────────────────────────────────────
-- 6. GRANTs de tabela (RLS controla linhas, GRANT controla acesso)
-- ────────────────────────────────────────────────────────────

grant usage on schema public to anon, authenticated;

grant select, insert, update on profiles  to authenticated;
grant select                  on audit_log to authenticated;
-- reports é acessado via RPC SECURITY DEFINER (save/load_report_secure),
-- então não precisa de grant direto para authenticated.


-- ────────────────────────────────────────────────────────────
-- 7. Trigger protect_profile_admin_fields — sem EXISTS recursivo
-- ────────────────────────────────────────────────────────────
-- Já é SECURITY DEFINER, mas vamos garantir o uso de is_admin()
-- para consistência e clareza.

create or replace function protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- auth.uid() é NULL quando o UPDATE vem do SQL Editor / service_role.
  -- Nesses contextos (admins DB) não aplicamos a proteção — só usuários
  -- autenticados via JWT passam pelo gate de is_admin().
  if auth.uid() is not null and not is_admin() then
    new.status            := old.status;
    new.role              := old.role;
    new.aprovado_por      := old.aprovado_por;
    new.aprovado_em       := old.aprovado_em;
    new.motivo_rejeicao   := old.motivo_rejeicao;
  end if;
  return new;
end;
$$;

-- O trigger já foi criado em supabase_setup.sql; só substituímos a função.


-- ============================================================
-- FIM
-- ============================================================
