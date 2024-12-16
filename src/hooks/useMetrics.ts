import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMetrics, addMetrics, deleteMetrics } from '../services/metrics';
import type { MetricsFormData } from '../types/metrics';

export function useMetrics(dateRange: { startDate: string; endDate: string }) {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('userId');

  const query = useQuery({
    queryKey: ['metrics', userId, dateRange],
    queryFn: () => fetchMetrics(dateRange.startDate, dateRange.endDate),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
    cacheTime: 1000 * 60 * 30, // Manter no cache por 30 minutos
  });

  const addMutation = useMutation({
    mutationFn: addMetrics,
    onSuccess: () => {
      // Invalida apenas as queries de métricas do usuário atual com o dateRange atual
      queryClient.invalidateQueries({ 
        queryKey: ['metrics', userId, dateRange]
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMetrics,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['metrics', userId, dateRange]
      });
    },
  });

  return {
    metrics: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    addMetrics: addMutation.mutate,
    deleteMetrics: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}