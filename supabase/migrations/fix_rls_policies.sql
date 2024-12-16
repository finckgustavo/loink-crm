-- Remover políticas existentes
drop policy if exists "Política de métricas" on public.metrics;
drop policy if exists "Política de tarefas" on public.todos;

-- Desabilitar RLS temporariamente
alter table public.metrics disable row level security;
alter table public.todos disable row level security;

-- Recriar políticas mais específicas
create policy "Política de leitura de métricas"
  on public.metrics
  for select
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de inserção de métricas"
  on public.metrics
  for insert
  with check (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de atualização de métricas"
  on public.metrics
  for update
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de exclusão de métricas"
  on public.metrics
  for delete
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de leitura de tarefas"
  on public.todos
  for select
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de inserção de tarefas"
  on public.todos
  for insert
  with check (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de atualização de tarefas"
  on public.todos
  for update
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

create policy "Política de exclusão de tarefas"
  on public.todos
  for delete
  using (
    user_id::text = coalesce(current_setting('app.user_id', true), '')
  );

-- Habilitar RLS novamente
alter table public.metrics enable row level security;
alter table public.todos enable row level security;