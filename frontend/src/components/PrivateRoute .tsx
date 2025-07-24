// import type React from "react";

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />
}
