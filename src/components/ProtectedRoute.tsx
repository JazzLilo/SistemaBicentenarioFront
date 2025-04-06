import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PublicRoutes } from '@/routes/routes';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!currentUser) {
    // Redirigir al login si no hay usuario autenticado
    return <Navigate to={PublicRoutes.Login} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
