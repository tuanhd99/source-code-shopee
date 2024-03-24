import { Navigate } from "react-router-dom";
import { RouterPath } from "./util";
export interface IProtectedRoute {
  children: JSX.Element;
}

function ProtectedRoute({ children }: IProtectedRoute) {
  const isAuthenticated = true; // Replace with your actual authentication check
  return isAuthenticated ? children : <Navigate to={RouterPath.Login} replace />;
}

export default ProtectedRoute;
