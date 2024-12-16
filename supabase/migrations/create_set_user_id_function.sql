-- Criar função para definir o user_id na sessão
create or replace function set_user_id(user_id text)
returns void as $$
begin
  perform set_config('app.user_id', user_id, false);
end;
$$ language plpgsql security definer;

-- Garantir que a função possa ser chamada
grant execute on function set_user_id to public;