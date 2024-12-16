-- Remover tabela existente se houver
drop table if exists public.users cascade;

-- Criar tabela de usuários simplificada
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password text not null,
  full_name text not null,
  role text not null default 'user',
  approved boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índices
create index users_email_idx on public.users (email);
create index users_approved_idx on public.users (approved);

-- Inserir usuário admin padrão
insert into public.users (email, password, full_name, role, approved)
values ('finckgustavo@gmail.com', 'admin123', 'Gustavo', 'admin', true);