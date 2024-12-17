import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';
import type { Database } from '../types/database';

export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey
);

export async function setUserSession(userId: string | null) {
  try {
    if (userId) {
      await supabase.rpc('set_user_id', { user_id: userId });
    }
  } catch (error) {
    console.error('Error setting session:', error);
    throw error;
  }
}

export async function clearUserSession() {
  try {
    sessionStorage.removeItem('userId');
    await supabase.rpc('set_user_id', { user_id: null });
  } catch (error) {
    console.error('Error clearing session:', error);
    throw error;
  }
}