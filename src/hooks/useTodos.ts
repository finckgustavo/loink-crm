import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todos';
import type { Todo } from '../types/todo';

export function useTodos() {
  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('userId');

  const query = useQuery({
    queryKey: ['todos', userId],
    queryFn: fetchTodos,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
    cacheTime: 1000 * 60 * 30, // Manter no cache por 30 minutos
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['todos', userId],
        exact: true
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['todos', userId],
        exact: true
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['todos', userId],
        exact: true
      });
    },
  });

  return {
    todos: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    addTodo: addMutation.mutate,
    updateTodo: updateMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
}