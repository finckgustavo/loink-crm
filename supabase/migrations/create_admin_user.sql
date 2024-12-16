-- Inserir o usuário admin
insert into public.users (id, email, full_name, role, approved)
select 
  id,
  email,
  'Gustavo',
  'admin',
  true
from auth.users
where email = 'finckgustavo@gmail.com'
limit 1;