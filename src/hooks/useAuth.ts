import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, signIn, signUp, signOut } from '../services/auth';
import type { SignInData, SignUpData } from '../types/auth';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutos
    cacheTime: 1000 * 60 * 30, // 30 minutos
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: async (user) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async (user) => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/auth');
    },
  });

  return {
    user,
    isLoading,
    isAdmin: user?.role === 'admin',
    isApproved: user?.approved,
    signIn: (data: SignInData) => signInMutation.mutateAsync(data),
    signUp: (data: SignUpData) => signUpMutation.mutateAsync(data),
    signOut: () => signOutMutation.mutateAsync(),
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    error: signInMutation.error || signUpMutation.error || signOutMutation.error,
  };
}