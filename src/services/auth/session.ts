import { supabase, setUserSession, clearUserSession } from '../../lib/supabase';

// Funções relacionadas à sessão do usuário
export async function getCurrentUser() {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      await clearSession();
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    await clearSession();
    return null;
  }
}

export function getSessionUserId(): string | null {
  return sessionStorage.getItem('userId');
}

export async function setSession(userId: string | null) {
  if (userId) {
    sessionStorage.setItem('userId', userId);
    await setUserSession(userId);
  } else {
    await clearSession();
  }
}

export async function clearSession() {
  sessionStorage.removeItem('userId');
  await clearUserSession();
}