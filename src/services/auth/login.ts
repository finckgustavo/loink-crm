import { supabase } from '../../lib/supabase';
import { setSession } from './session';
import type { SignInData } from '../../types/auth';

export async function signIn({ email, password }: SignInData) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !user) {
      throw new Error('E-mail ou senha inválidos');
    }

    if (!user.approved) {
      throw new Error('Sua conta ainda não foi aprovada pelo administrador');
    }

    // Configurar sessão
    await setSession(user.id);

    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}