import { supabase } from '../lib/supabase';
import type { EventFormData } from '../types/event';

export async function fetchEvents() {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addEvent(data: EventFormData) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  // Ajustar a data para o fuso horário local
  const localDate = new Date(data.date);
  const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
  
  const { data: result, error } = await supabase
    .from('events')
    .insert([{
      title: data.title,
      description: data.description,
      date: utcDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      user_id: userId,
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return result;
}

export async function deleteEvent(eventId: string) {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', eventId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
}