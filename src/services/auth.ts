import { supabase, setUserSession, clearUserSession } from '../lib/supabase';
import type { SignInData, SignUpData, User } from '../types/auth';

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
      await clearUserSession();
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error getting current user:', error);
    await clearUserSession();
    return null;
  }
}

export async function signIn({ email, password }: SignInData): Promise<User> {
  try {
    // Clear any existing session
    await clearUserSession();

    // Attempt to sign in
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

    // Set session
    sessionStorage.setItem('userId', user.id);
    await setUserSession(user.id);

    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  await clearUserSession();
}

export async function signUp({ email, password, full_name }: SignUpData) {
  try {
    // Check if email exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Este e-mail já está em uso');
    }

    // Create new user
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
    console.error('Error signing up:', error);
    throw error;
  }
}