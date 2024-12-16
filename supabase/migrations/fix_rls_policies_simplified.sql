-- Remover todas as políticas existentes
drop policy if exists "Política de métricas" on public.metrics;
drop policy if exists "Política de tarefas" on public.todos;
drop policy if exists "Política de leitura de métricas" on public.metrics;
drop policy if exists "Política de inserção de métricas" on public.metrics;
drop policy if exists "Política de atualização de métricas" on public.metrics;
drop policy if exists "Política de exclusão de métricas" on public.metrics;
drop policy if exists "Política de leitura de tarefas" on public.todos;
drop policy if exists "Política de inserção de tarefas" on public.todos;
drop policy if exists "Política de atualização de tarefas" on public.todos;
drop policy if exists "Política de exclusão de tarefas" on public.todos;

-- Desabilitar RLS temporariamente
alter table public.metrics disable row level security;
alter table public.todos disable row level security;

-- Criar políticas simplificadas
create policy "metrics_policy"
  on public.metrics
  for all
  using (user_id::text = coalesce(current_setting('app.user_id', true), ''));

create policy "todos_policy"
  on public.todos
  for all
  using (user_id::text = coalesce(current_setting('app.user_id', true), ''));

-- Habilitar RLS novamente
alter table public.metrics enable row level security;
alter table public.todos enable row level security;