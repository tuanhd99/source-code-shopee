import { useRoutes } from "react-router-dom";
import { RouterPath } from "./util";
import RegisterLayout from "src/layouts/RegisterLayout/RegisterLayout";
import React, { Suspense } from "react";
import LoadingArea from "src/components/loading/LoadingArea";
import MainLayout from "src/layouts/MainLayout";

const Login = React.lazy(() => import("src/pages/Login"));
const Register = React.lazy(() => import("src/pages/Register"));
const ProductList = React.lazy(() => import("src/pages/Products"));

export default function useRounterElement() {
  const routerElement = useRoutes([
    {
      path: RouterPath.Index,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <ProductList />
            </Suspense>
          )
        }
      ]
    },
    {
      path: RouterPath.Login,
      element: <RegisterLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <Login />
            </Suspense>
          )
        }
      ]
    },
    {
      path: RouterPath.Register,
      element: <RegisterLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: "/loading",
      element: <LoadingArea />
    }
  ]);
  return routerElement;
}
