-- Primeiro, remover a tabela existente
drop table if exists public.users cascade;

-- Criar a tabela de usuários
create table public.users (
  -- Chave primária vinculada ao auth.users
  id uuid references auth.users on delete cascade not null primary key,
  
  -- Informações básicas do usuário
  email text not null unique,
  full_name text not null,
  
  -- Controle de acesso
  role text not null default 'user' check (role in ('user', 'admin')),
  approved boolean not null default false,
  
  -- Metadados
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Row Level Security)
alter table public.users enable row level security;

-- Criar políticas de acesso
create policy "Permitir leitura pública para autenticados"
  on public.users
  for select
  using (auth.role() = 'authenticated');

create policy "Permitir todas as operações para admins"
  on public.users
  for all
  using (
    exists (
      select 1 from public.users
      where id = auth.uid()
      and role = 'admin'
    )
  );

-- Criar índices para melhor performance
create index users_email_idx on public.users (email);
create index users_role_idx on public.users (role);
create index users_approved_idx on public.users (approved);