import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, signIn, signUp, signOut } from '../services/auth';
import type { SignInData, SignUpData } from '../types/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (user) => {
      // Set user data immediately
      queryClient.setQueryData(['user'], user);
      
      // Navigate to dashboard or intended page
      const intendedPath = location.state?.from?.pathname || '/dashboard';
      navigate(intendedPath, { replace: true });
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/auth', { replace: true });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Redirect to login
      navigate('/auth', { replace: true });
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