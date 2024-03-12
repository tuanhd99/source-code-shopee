import { useRoutes } from "react-router-dom";
import { RouterPath } from "./util";
import Products from "src/pages/Products";
import RegisterLayout from "src/layouts/RegisterLayout/RegisterLayout";
import React, { Suspense } from "react";
import LoadingArea from "src/components/loading/LoadingArea";

const Login = React.lazy(() => import("src/pages/Login"));
const Register = React.lazy(() => import("src/pages/Register"));

export default function useRounterElement() {
  const routerElement = useRoutes([
    {
      path: RouterPath.ProductsList,
      element: <Products />
    },
    {
      path: RouterPath.Login,
      element: (
        <Suspense fallback={<LoadingArea />}>
          <RegisterLayout>
            <Login />
          </RegisterLayout>
        </Suspense>
      )
    },
    {
      path: RouterPath.Register,
      element: (
        <Suspense fallback={<LoadingArea />}>
          <RegisterLayout>
            <Register />
          </RegisterLayout>
        </Suspense>
      )
    },
    {
      path: "/loading",
      element: <LoadingArea />
    }
  ]);
  return routerElement;
}
