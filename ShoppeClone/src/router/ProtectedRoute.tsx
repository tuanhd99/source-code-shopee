import { Navigate } from "react-router-dom";
import { RouterPath } from "./util";
import { useContext } from "react";
import { AppContext } from "src/contexts/App.Context";
export interface IProtectedRoute {
  children: JSX.Element;
}

function ProtectedRoute({ children }: IProtectedRoute) {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? children : <Navigate to={RouterPath.Login} replace />;
}

export default ProtectedRoute;
