-- Remover função existente se houver
drop function if exists set_user_id(text);
drop function if exists get_user_id();

-- Criar função simplificada para definir o user_id na sessão
create or replace function set_user_id(user_id text)
returns void as $$
begin
  perform set_config('app.user_id', user_id, false);
end;
$$ language plpgsql security definer;

-- Garantir que a função possa ser chamada
grant execute on function set_user_id(text) to public;