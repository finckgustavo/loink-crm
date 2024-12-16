import { supabase } from '../lib/supabase';
import type { MetricsFormData } from '../types/metrics';

export async function fetchMetrics(startDate?: string, endDate?: string) {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    // Garantir que a sessão está configurada
    await supabase.rpc('set_user_id', { user_id: userId });

    let query = supabase
      .from('metrics')
      .select('*')
      .order('date', { ascending: false });

    // Se tiver data inicial e final iguais, filtrar apenas por aquele dia específico
    if (startDate && endDate) {
      if (startDate === endDate) {
        // Filtrar apenas pelo dia específico
        query = query.eq('date', startDate);
      } else {
        // Filtrar pelo intervalo de datas
        query = query.gte('date', startDate).lte('date', endDate);
      }
    } else {
      // Se tiver apenas data inicial
      if (startDate) {
        query = query.gte('date', startDate);
      }
      // Se tiver apenas data final
      if (endDate) {
        query = query.lte('date', endDate);
      }
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    throw error;
  }
}

export async function addMetrics(data: MetricsFormData) {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    // Garantir que a sessão está configurada
    await supabase.rpc('set_user_id', { user_id: userId });

    const { spend, revenue, impressions, clicks } = data;
    
    // Calcular métricas derivadas
    const profit = revenue - spend;
    const roas = revenue / spend;
    const ctr = (clicks / impressions) * 100;
    const cpc = spend / clicks;

    const { data: result, error } = await supabase
      .from('metrics')
      .insert([
        {
          ...data,
          profit,
          roas,
          ctr,
          cpc,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return result;
  } catch (error) {
    console.error('Erro ao adicionar métrica:', error);
    throw error;
  }
}

export async function deleteMetrics(id: string) {
  try {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    // Garantir que a sessão está configurada
    await supabase.rpc('set_user_id', { user_id: userId });

    const { error } = await supabase
      .from('metrics')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro ao excluir métrica:', error);
    throw error;
  }
}