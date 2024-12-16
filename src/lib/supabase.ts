import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import type { Database } from '../types/database';

// Criar cliente Supabase com configurações padrão
export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey
);

// Função para configurar o user_id na sessão
export async function setUserSession(userId: string | null) {
  try {
    await supabase.rpc('set_user_id', { user_id: userId });
  } catch (error) {
    console.error('Erro ao configurar sessão:', error);
    throw error;
  }
}

// Função para limpar a sessão
export async function clearUserSession() {
  try {
    await setUserSession(null);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
    throw error;
  }
}

// Função para obter o user_id da sessão
export async function getUserSession() {
  try {
    const { data, error } = await supabase.rpc('get_user_id');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
}