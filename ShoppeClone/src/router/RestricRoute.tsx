import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "src/contexts/App.Context";
import { RouterPath } from "./util";

interface IResTricRoute {
  children: React.ReactNode;
}

function RestricRoute({ children }: IResTricRoute) {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? children : <Navigate to={RouterPath.Index} replace />;
}

export default RestricRoute;
