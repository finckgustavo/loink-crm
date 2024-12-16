import { supabase, setUserSession, clearUserSession } from '../lib/supabase';
import type { SignUpData, SignInData, User } from '../types/auth';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      sessionStorage.removeItem('userId');
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    sessionStorage.removeItem('userId');
    return null;
  }
}

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
    sessionStorage.setItem('userId', user.id);
    await setUserSession(user.id);

    return user;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
}

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

export async function signOut() {
  try {
    sessionStorage.removeItem('userId');
    await clearUserSession();
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function approveUser(userId: string, approved: boolean) {
  const { data, error } = await supabase
    .from('users')
    .update({ approved })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}