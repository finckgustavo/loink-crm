-- Remover políticas existentes
drop policy if exists "Usuários podem ver apenas suas próprias métricas" on public.metrics;
drop policy if exists "Usuários podem inserir apenas suas próprias métricas" on public.metrics;
drop policy if exists "Usuários podem atualizar apenas suas próprias métricas" on public.metrics;
drop policy if exists "Usuários podem deletar apenas suas próprias métricas" on public.metrics;

drop policy if exists "Usuários podem ver apenas suas próprias tarefas" on public.todos;
drop policy if exists "Usuários podem inserir apenas suas próprias tarefas" on public.todos;
drop policy if exists "Usuários podem atualizar apenas suas próprias tarefas" on public.todos;
drop policy if exists "Usuários podem deletar apenas suas próprias tarefas" on public.todos;

-- Desabilitar RLS temporariamente
alter table public.metrics disable row level security;
alter table public.todos disable row level security;

-- Garantir que as colunas user_id existam
alter table public.metrics 
  drop column if exists user_id,
  add column user_id uuid references public.users(id) on delete cascade;

alter table public.todos
  drop column if exists user_id,
  add column user_id uuid references public.users(id) on delete cascade;

-- Recriar índices
drop index if exists metrics_user_id_idx;
drop index if exists todos_user_id_idx;
create index metrics_user_id_idx on public.metrics(user_id);
create index todos_user_id_idx on public.todos(user_id);

-- Habilitar RLS novamente
alter table public.metrics enable row level security;
alter table public.todos enable row level security;

-- Criar políticas simplificadas
create policy "Política de métricas"
  on public.metrics
  for all
  using (user_id::text = current_setting('app.user_id', true));

create policy "Política de tarefas"
  on public.todos
  for all
  using (user_id::text = current_setting('app.user_id', true));