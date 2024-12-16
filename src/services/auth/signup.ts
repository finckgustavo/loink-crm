import { supabase } from '../../lib/supabase';
import type { SignUpData } from '../../types/auth';

export async function signUp({ email, password, full_name }: SignUpData) {
  try {
    // Verificar se o email já existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Este e-mail já está em uso');
    }

    // Criar novo usuário
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password,
          full_name,
          role: 'user',
          approved: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}