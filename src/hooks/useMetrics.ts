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
    staleTime: 1000 * 60 * 60, // 1 hora
    cacheTime: 1000 * 60 * 60 * 2, // 2 horas
    keepPreviousData: true,
    retry: 3,
  });

  const addMutation = useMutation({
    mutationFn: addMetrics,
    onSuccess: () => {
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
    isLoading: query.isLoading && !query.isPreviousData,
    isFetching: query.isFetching,
    error: query.error,
    addMetrics: addMutation.mutate,
    deleteMetrics: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}