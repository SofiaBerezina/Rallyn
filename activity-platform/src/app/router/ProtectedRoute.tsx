import { Navigate } from "react-router-dom";
import { useAuth } from "../../shared/hooks/useAuth";
import * as React from "react";
import { ROUTES } from "../../shared/config/routes.ts";
import Loader from "../../shared/ui/Loader/Loader.tsx";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { user, isAuthInitializing } = useAuth();

  if (isAuthInitializing) return <Loader />;

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return children;
};
