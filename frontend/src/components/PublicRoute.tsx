import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;
