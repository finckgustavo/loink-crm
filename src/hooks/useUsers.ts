import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, approveUser, deleteUser } from '../services/admin';

export function useUsers() {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 30, // 30 minutos
  });

  const approveMutation = useMutation({
    mutationFn: ({ userId, approved }: { userId: string; approved: boolean }) =>
      approveUser(userId, approved),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: users || [],
    isLoading,
    approveUser: approveMutation.mutate,
    deleteUser: deleteMutation.mutate,
    isApproving: approveMutation.isPending,
    isDeleting: deleteMutation.isPending,
    error: approveMutation.error || deleteMutation.error,
  };
}