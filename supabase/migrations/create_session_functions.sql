-- Função para definir o user_id na sessão
create or replace function set_user_id(user_id text)
returns void as $$
begin
  perform set_config('app.user_id', user_id, false);
end;
$$ language plpgsql security definer;

-- Função para obter o user_id da sessão
create or replace function get_user_id()
returns text as $$
begin
  return current_setting('app.user_id', true);
end;
$$ language plpgsql security definer;

-- Garantir que as funções possam ser chamadas
grant execute on function set_user_id(text) to public;
grant execute on function get_user_id() to public;