import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEvents, addEvent, deleteEvent } from '../services/events';
import type { EventFormData } from '../types/event';

export function useEvents() {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('userId');

  const query = useQuery({
    queryKey: ['events', userId],
    queryFn: fetchEvents,
    enabled: !!userId,
    staleTime: 1000 * 60 * 60, // 1 hora
    cacheTime: 1000 * 60 * 60 * 2, // 2 horas
    keepPreviousData: true,
    retry: 3,
  });

  const addMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['events', userId],
        exact: true
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['events', userId],
        exact: true
      });
    },
  });

  return {
    events: query.data ?? [],
    isLoading: query.isLoading && !query.isPreviousData,
    isFetching: query.isFetching,
    error: query.error,
    addEvent: addMutation.mutate,
    deleteEvent: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}