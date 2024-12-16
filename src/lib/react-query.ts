import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Aumentar o tempo de cache para 1 hora
      staleTime: 1000 * 60 * 60, // 1 hora
      cacheTime: 1000 * 60 * 60 * 2, // 2 horas
      // Manter dados antigos enquanto revalida
      keepPreviousData: true,
      // Revalidar em certas condições
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      // Tentar novamente em caso de erro
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});