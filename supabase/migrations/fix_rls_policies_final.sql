-- Remover todas as políticas existentes
drop policy if exists "metrics_policy" on public.metrics;
drop policy if exists "todos_policy" on public.todos;
drop policy if exists "events_policy" on public.events;

-- Desabilitar RLS temporariamente
alter table public.metrics disable row level security;
alter table public.todos disable row level security;
alter table public.events disable row level security;

-- Criar políticas mais permissivas
create policy "metrics_policy"
  on public.metrics
  for all
  using (true)
  with check (user_id::text = coalesce(current_setting('app.user_id', true), ''));

create policy "todos_policy"
  on public.todos
  for all
  using (true)
  with check (user_id::text = coalesce(current_setting('app.user_id', true), ''));

create policy "events_policy"
  on public.events
  for all
  using (true)
  with check (user_id::text = coalesce(current_setting('app.user_id', true), ''));

-- Habilitar RLS novamente
alter table public.metrics enable row level security;
alter table public.todos enable row level security;
alter table public.events enable row level security;

-- Criar função para verificar usuário atual
create or replace function get_current_user_id()
returns text as $$
begin
  return coalesce(current_setting('app.user_id', true), '');
end;
$$ language plpgsql security definer;

-- Garantir que a função possa ser chamada
grant execute on function get_current_user_id() to public;