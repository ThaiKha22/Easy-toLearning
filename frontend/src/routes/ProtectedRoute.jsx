import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ACCESS_TOKEN_KEY = 'studyhub_access_token';

export default function ProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
