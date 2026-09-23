-- ============================================================
-- Emergência Pro — Fix & Diagnóstico de Aprovação de Usuários
-- Execute este script no SQL Editor do Dashboard Supabase
-- ============================================================

-- 1. Diagnóstico: Listar usuários atuais e seus papéis
select id, email, status, role, aprovado_em, created_at
from public.profiles
order by created_at desc;

-- 2. Garantir que o seu usuário tenha papel de administrador e esteja aprovado
-- (Substitua o e-mail caso utilize outro endereço de login)
update public.profiles
   set role = 'admin'::user_role,
       status = 'approved'::user_status,
       aprovado_em = coalesce(aprovado_em, now())
 where lower(email) = 'mateustcandido@gmail.com';

-- 3. Garantir que a função helper is_admin() seja SECURITY DEFINER com search_path correto
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public, auth
stable
as $$
  select coalesce((select role = 'admin' from public.profiles where id = auth.uid()), false);
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 4. Garantir que a policy RLS profiles_update_admin possua USING e WITH CHECK explícitos
drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin" on public.profiles
  for update
  using (is_admin())
  with check (is_admin());

-- 5. Garantir permissões de UPDATE na tabela profiles para o role authenticated
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;

-- 6. Trigger de proteção de campos administrativos
-- Permite que administradores alterem status, role, motivo_rejeicao, aprovado_em, aprovado_por
create or replace function public.protect_profile_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  -- Apenas filtra se o usuário estiver autenticado e NÃO for admin
  if auth.uid() is not null and not is_admin() then
    new.status            := old.status;
    new.role              := old.role;
    new.aprovado_por      := old.aprovado_por;
    new.aprovado_em       := old.aprovado_em;
    new.motivo_rejeicao   := old.motivo_rejeicao;

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

-- 7. Query final para verificar se o usuário agora é admin:
select id, email, status, role
from public.profiles
where lower(email) = 'mateustcandido@gmail.com';
