import { supabase } from '../lib/supabase';
import type { Todo } from '../types/todo';

export async function fetchTodos() {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addTodo(title: string) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('todos')
    .insert([{
      title,
      completed: false,
      important: false,
      user_id: userId,
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateTodo(id: string, updates: Partial<Todo>) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTodo(id: string) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
}