import { Outlet, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { LoadingOverlay } from '../LoadingOverlay';

export function Layout() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Prefetch data when route changes
  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    setIsInitialLoad(true);

    const prefetchData = async () => {
      try {
        // Prefetch based on current route
        switch (location.pathname) {
          case '/metrics':
            await queryClient.prefetchQuery({
              queryKey: ['metrics', userId, { startDate: '', endDate: '' }],
              staleTime: 1000 * 60 * 60,
            });
            break;
          case '/todos':
            await queryClient.prefetchQuery({
              queryKey: ['todos', userId],
              staleTime: 1000 * 60 * 60,
            });
            break;
          case '/calendar':
            await queryClient.prefetchQuery({
              queryKey: ['events', userId],
              staleTime: 1000 * 60 * 60,
            });
            break;
        }
      } finally {
        setIsInitialLoad(false);
      }
    };

    prefetchData();
  }, [location.pathname, queryClient]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-20 max-w-[calc(100%-5rem)] overflow-x-hidden">
        {isInitialLoad && <LoadingOverlay />}
        <Outlet />
      </main>
    </div>
  );
}