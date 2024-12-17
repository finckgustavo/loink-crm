import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export function PrivateRoute() {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    // Save the attempted URL for redirection after login
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
}