-- ============================================================
-- Emergência Pro — Supabase setup
-- Cole este SQL no Editor SQL do seu projeto Supabase
-- ============================================================

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

-- Cada usuário vê e insere apenas seus próprios relatórios
create policy "own_select" on reports
  for select using (auth.uid() = user_id);

create policy "own_insert" on reports
  for insert with check (auth.uid() = user_id);
