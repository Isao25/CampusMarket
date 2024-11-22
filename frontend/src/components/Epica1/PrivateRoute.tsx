import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }:PrivateRouteProps) => {
  const { verificado } = useAuth();

  return verificado? (
    children
  ) : (
    <Navigate to={"/"}/>
  );
};

