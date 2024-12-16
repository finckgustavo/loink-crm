import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { AuthPage } from './pages/AuthPage';
import { AdminPage } from './pages/AdminPage';
import { ProfilePage } from './pages/ProfilePage';
import { Dashboard } from './components/Dashboard';
import { MetricsList } from './pages/MetricsList';
import { ChartsPage } from './pages/ChartsPage';
import { TodoListPage } from './pages/TodoList';
import { CalendarPage } from './pages/Calendar';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { AdminRoute } from './components/auth/AdminRoute';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rota pública */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Rota raiz - redireciona para /auth se não autenticado */}
            <Route path="/" element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="metrics" element={<MetricsList />} />
                <Route path="charts" element={<ChartsPage />} />
                <Route path="todos" element={<TodoListPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="profile" element={<ProfilePage />} />
                
                {/* Rota de admin */}
                <Route element={<AdminRoute />}>
                  <Route path="admin" element={<AdminPage />} />
                </Route>
              </Route>
            </Route>

            {/* Redireciona qualquer rota não encontrada para a raiz */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}