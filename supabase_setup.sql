-- ============================================================
-- Emergência Pro — Supabase setup (idempotente — pode rodar várias vezes)
-- Cole este SQL no Editor SQL do seu projeto Supabase
--
-- Blocos:
--   1. Enums (user_status, user_role)
--   2. Tabela reports (existente, preservada)
--   3. Tabela profiles (1:1 com auth.users)
--   4. Tabela audit_log
--   5. Triggers de suporte (handle_new_user, updated_at, proteção de campos admin)
--   6. Função e triggers de auditoria
--   7. Storage bucket kyc-docs + policies
--   8. Policies RLS — profiles
--   9. Policies RLS — reports (atualizado para checar status approved)
--  10. Policies RLS — audit_log
--  11. Seed: Mateus como admin
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. ENUMS
-- ────────────────────────────────────────────────────────────

do $$ begin
  create type user_status as enum ('pending', 'approved', 'rejected', 'suspended');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type user_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;


-- ────────────────────────────────────────────────────────────
-- 2. TABELA reports (preservada)
-- ────────────────────────────────────────────────────────────

create table if not exists reports (
  id          bigint primary key generated always as identity,
  user_id     uuid references auth.users not null default auth.uid(),
  key         text not null,
  nome        text,
  queixa      text,
  report_date text,
  txt         text,
  created_at  timestamptz default now()
);

alter table reports enable row level security;


-- ────────────────────────────────────────────────────────────
-- 3. TABELA profiles
-- ────────────────────────────────────────────────────────────

create table if not exists profiles (
  id                uuid        primary key references auth.users(id) on delete cascade,
  email             text        not null,
  nome_completo     text,
  crm               text,
  crm_uf            text        check (crm_uf ~ '^[A-Z]{2}$'),
  especialidade     text,
  telefone          text,
  status            user_status not null default 'pending',
  role              user_role   not null default 'user',
  aprovado_por      uuid        references auth.users(id),
  aprovado_em       timestamptz,
  motivo_rejeicao   text,
  selfie_path       text,       -- caminho no bucket kyc-docs: {user_id}/selfie.jpg
  crm_doc_path      text,       -- caminho no bucket kyc-docs: {user_id}/crm.jpg
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table profiles enable row level security;

-- Índice auxiliar para lookup de admin (usado em múltiplas policies)
create index if not exists profiles_role_idx on profiles(role);
create index if not exists profiles_status_idx on profiles(status);


-- ────────────────────────────────────────────────────────────
-- 4. TABELA audit_log
-- ────────────────────────────────────────────────────────────

create table if not exists audit_log (
  id          bigint      primary key generated always as identity,
  user_id     uuid,                           -- auth.uid() no momento da ação
  table_name  text        not null,
  action      text        not null check (action in ('insert', 'update', 'delete')),
  row_id      text,                           -- representação textual do PK da linha afetada
  before      jsonb,
  after       jsonb,
  created_at  timestamptz default now()
);

alter table audit_log enable row level security;

create index if not exists audit_log_table_created_idx on audit_log(table_name, created_at desc);
create index if not exists audit_log_user_created_idx  on audit_log(user_id,     created_at desc);


-- ────────────────────────────────────────────────────────────
-- 5. TRIGGERS DE SUPORTE
-- ────────────────────────────────────────────────────────────

-- 5a. handle_new_user: cria profile ao registrar novo usuário
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into profiles (id, email, status, role)
  values (new.id, new.email, 'pending', 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();


-- 5b. updated_at: atualiza profiles.updated_at em cada UPDATE
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
  before update on profiles
  for each row execute procedure set_updated_at();


-- 5c. Funções helper is_admin() / is_approved()
--     SECURITY DEFINER (bypass RLS) para evitar recursão em policies de profiles
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


-- 5d. Proteção de campos administrativos (status, role):
--     impede que um user não-admin altere status/role/aprovado_por/aprovado_em/motivo_rejeicao
create or replace function protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not is_admin() then
    new.status            := old.status;
    new.role              := old.role;
    new.aprovado_por      := old.aprovado_por;
    new.aprovado_em       := old.aprovado_em;
    new.motivo_rejeicao   := old.motivo_rejeicao;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_admin_fields on profiles;
create trigger profiles_protect_admin_fields
  before update on profiles
  for each row execute procedure protect_profile_admin_fields();


-- ────────────────────────────────────────────────────────────
-- 6. AUDITORIA: função genérica + triggers em profiles e reports
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
  v_action := lower(tg_op);  -- 'insert' | 'update' | 'delete'

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

  insert into audit_log (user_id, table_name, action, row_id, before, after)
  values (auth.uid(), tg_table_name, v_action, v_row_id, v_before, v_after);

  return coalesce(new, old);
end;
$$;

-- Trigger de auditoria em profiles
drop trigger if exists audit_profiles on profiles;
create trigger audit_profiles
  after insert or update or delete on profiles
  for each row execute procedure audit_trigger_fn();

-- Trigger de auditoria em reports
drop trigger if exists audit_reports on reports;
create trigger audit_reports
  after insert or update or delete on reports
  for each row execute procedure audit_trigger_fn();


-- ────────────────────────────────────────────────────────────
-- 7. STORAGE BUCKET kyc-docs (privado)
-- ────────────────────────────────────────────────────────────

-- Cria bucket se ainda não existir (idempotente via on conflict)
insert into storage.buckets (id, name, public)
values ('kyc-docs', 'kyc-docs', false)
on conflict (id) do nothing;

-- Policies de storage (drop antes de recriar para idempotência)
drop policy if exists "kyc_select_owner_or_admin" on storage.objects;
drop policy if exists "kyc_insert_owner_or_admin" on storage.objects;
drop policy if exists "kyc_update_owner_or_admin" on storage.objects;
drop policy if exists "kyc_delete_admin_only"     on storage.objects;

-- SELECT: owner (path começa com user_id/) OU admin
create policy "kyc_select_owner_or_admin" on storage.objects
  for select using (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

-- INSERT: owner (path começa com user_id/) OU admin
create policy "kyc_insert_owner_or_admin" on storage.objects
  for insert with check (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

-- UPDATE: owner OU admin
create policy "kyc_update_owner_or_admin" on storage.objects
  for update using (
    bucket_id = 'kyc-docs'
    and ((storage.foldername(name))[1] = auth.uid()::text or is_admin())
  );

-- DELETE: somente admin
create policy "kyc_delete_admin_only" on storage.objects
  for delete using (
    bucket_id = 'kyc-docs'
    and is_admin()
  );


-- ────────────────────────────────────────────────────────────
-- 8. POLICIES RLS — profiles
-- ────────────────────────────────────────────────────────────

drop policy if exists "profiles_select_own_or_admin" on profiles;
drop policy if exists "profiles_insert_own"           on profiles;
drop policy if exists "profiles_update_own"           on profiles;
drop policy if exists "profiles_update_admin"         on profiles;
drop policy if exists "profiles_delete_blocked"       on profiles;

-- SELECT: próprio perfil OU admin
create policy "profiles_select_own_or_admin" on profiles
  for select using (auth.uid() = id or is_admin());

-- INSERT: apenas o próprio (handle_new_user usa SECURITY DEFINER, então não precisa de policy
--         permissiva para trigger; mantemos a policy para cobertura explícita)
create policy "profiles_insert_own" on profiles
  for insert with check (auth.uid() = id);

-- UPDATE: usuário comum pode atualizar seus próprios campos não-administrativos
--         (a proteção real dos campos admin é feita pelo trigger protect_profile_admin_fields)
create policy "profiles_update_own" on profiles
  for update
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- UPDATE extra: admin pode atualizar qualquer perfil
create policy "profiles_update_admin" on profiles
  for update using (is_admin());

-- DELETE: bloqueado — não deletamos profiles diretamente
create policy "profiles_delete_blocked" on profiles
  for delete using (false);


-- ────────────────────────────────────────────────────────────
-- 9. POLICIES RLS — reports (atualizado: requer status = 'approved')
-- ────────────────────────────────────────────────────────────

drop policy if exists "own_select" on reports;
drop policy if exists "own_insert" on reports;
drop policy if exists "own_update" on reports;
drop policy if exists "own_delete" on reports;

create policy "own_select" on reports
  for select using (auth.uid() = user_id and is_approved());

create policy "own_insert" on reports
  for insert with check (auth.uid() = user_id and is_approved());

create policy "own_update" on reports
  for update
  using      (auth.uid() = user_id and is_approved())
  with check (auth.uid() = user_id and is_approved());

create policy "own_delete" on reports
  for delete using (auth.uid() = user_id and is_approved());


-- ────────────────────────────────────────────────────────────
-- 10. POLICIES RLS — audit_log
-- ────────────────────────────────────────────────────────────

drop policy if exists "audit_select_admin_only"   on audit_log;
drop policy if exists "audit_insert_blocked"      on audit_log;
drop policy if exists "audit_update_blocked"      on audit_log;
drop policy if exists "audit_delete_blocked"      on audit_log;

-- SELECT: somente admin
create policy "audit_select_admin_only" on audit_log
  for select using (is_admin());

-- INSERT: bloqueado via policy (inserções são feitas pelo trigger SECURITY DEFINER)
create policy "audit_insert_blocked" on audit_log
  for insert with check (false);

-- UPDATE: bloqueado para todos
create policy "audit_update_blocked" on audit_log
  for update using (false);

-- DELETE: bloqueado para todos
create policy "audit_delete_blocked" on audit_log
  for delete using (false);


-- ────────────────────────────────────────────────────────────
-- 11. GRANTs de tabela (RLS controla linhas, GRANT controla acesso ao role)
-- ────────────────────────────────────────────────────────────

grant usage on schema public to anon, authenticated;

grant select, insert, update on profiles  to authenticated;
grant select                  on audit_log to authenticated;
-- reports é acessado via RPC SECURITY DEFINER (save/load_report_secure),
-- então não precisa de grant direto para authenticated.


-- ────────────────────────────────────────────────────────────
-- 12. SEED — Mateus como admin (idempotente; cobre usuários
--     criados antes do trigger handle_new_user existir)
-- ────────────────────────────────────────────────────────────

insert into profiles (id, email, status, role, aprovado_em, nome_completo)
select
  u.id,
  u.email,
  'approved'::user_status,
  'admin'::user_role,
  now(),
  'Mateus Teixeira Candido'
from auth.users u
where u.email = 'mateustcandido@gmail.com'
on conflict (id) do update
   set status        = 'approved'::user_status,
       role          = 'admin'::user_role,
       aprovado_em   = coalesce(profiles.aprovado_em, now()),
       nome_completo = coalesce(profiles.nome_completo, 'Mateus Teixeira Candido');

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
