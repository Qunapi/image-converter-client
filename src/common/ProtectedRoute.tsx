import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
