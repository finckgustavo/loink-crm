import { supabase } from '../lib/supabase';

type UpdateProfileParams = 
  | { type: 'name'; full_name: string }
  | { type: 'email'; email: string; password: string }
  | { type: 'password'; current_password: string; new_password: string };

export async function updateUserProfile(params: UpdateProfileParams) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  // Buscar usuário atual para validações
  const { data: currentUser } = await supabase
    .from('users')
    .select('password')
    .eq('id', userId)
    .single();

  if (!currentUser) {
    throw new Error('Usuário não encontrado');
  }

  // Preparar dados para atualização com base no tipo
  let updateData: any = {};

  switch (params.type) {
    case 'name':
      updateData = { full_name: params.full_name };
      break;

    case 'email':
      // Verificar senha atual
      if (params.password !== currentUser.password) {
        throw new Error('Senha incorreta');
      }
      updateData = { email: params.email };
      break;

    case 'password':
      // Verificar senha atual
      if (params.current_password !== currentUser.password) {
        throw new Error('Senha atual incorreta');
      }
      updateData = { password: params.new_password };
      break;
  }

  // Atualizar perfil
  const { error } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', userId);

  if (error) {
    throw error;
  }
}