import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Aumentar tempo de cache
      staleTime: 1000 * 60 * 60, // 1 hora
      cacheTime: 1000 * 60 * 60 * 2, // 2 horas
      // Manter dados anteriores enquanto recarrega
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