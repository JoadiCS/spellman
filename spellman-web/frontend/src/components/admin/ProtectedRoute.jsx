import { Navigate } from 'react-router-dom';
import Spinner from '../ui/spinner.jsx';
import useAuth from '../../hooks/useAuth.js';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-neutral-900"><Spinner /></div>;

  if (!user) return <Navigate to="/login" replace />;
  if (requireAdmin && user.role !== 'admin') return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
