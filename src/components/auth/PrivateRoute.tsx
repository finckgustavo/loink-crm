import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export function PrivateRoute() {
  const { user, isLoading, isApproved } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aguardando Aprovação</h2>
          <p className="text-gray-600">
            Sua conta está pendente de aprovação. Por favor, aguarde até que um administrador aprove seu acesso.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}