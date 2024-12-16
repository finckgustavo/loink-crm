-- Criar tabela de eventos
create table public.events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date date not null,
  user_id uuid references public.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índices
create index events_user_id_idx on public.events(user_id);
create index events_date_idx on public.events(date);

-- Habilitar RLS
alter table public.events enable row level security;

-- Criar política de acesso
create policy "events_policy"
  on public.events
  for all
  using (user_id::text = coalesce(current_setting('app.user_id', true), ''));