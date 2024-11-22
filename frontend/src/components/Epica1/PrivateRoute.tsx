import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }:PrivateRouteProps) => {
  const { authState } = useAuth();

  return authState.userId? (
    children
  ) : (
    <Navigate to={"/"}/>
  );
};

