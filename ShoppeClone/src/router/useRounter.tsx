import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingArea from "src/components/loading/LoadingArea";
import MainLayout from "src/layouts/MainLayout";
import RegisterLayout from "src/layouts/RegisterLayout/RegisterLayout";
import { RouterPath } from "./util";
import ProtectedRoute from "./ProtectedRoute";
import RestricRoute from "./RestricRoute";
import CartLayout from "src/layouts/CartLayOut/CartLayout";
import LayoutUser from "src/pages/User/LayoutUser/LayoutUser";
import NotFound from "src/pages/error/NotFound";

const Login = React.lazy(() => import("src/pages/Login"));
const Register = React.lazy(() => import("src/pages/Register"));
const ProductList = React.lazy(() => import("src/pages/Products"));
const Profile = React.lazy(() => import("src/pages/User/Profile"));
const ChangePassword = React.lazy(() => import("src/pages/User/ChangePassword"));
const HistoryPurchase = React.lazy(() => import("src/pages/User/History"));
const ProductDetail = React.lazy(() => import("src/pages/ProductDetail"));
const Cart = React.lazy(() => import("src/pages/Cart"));

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
        },
        {
          element: <LayoutUser />,
          children: [
            {
              index: true,
              path: RouterPath.Profile,
              element: (
                <Suspense fallback={<LoadingArea />}>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Suspense>
              )
            },
            {
              path: RouterPath.ChangePassword,
              element: (
                <Suspense fallback={<LoadingArea />}>
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                </Suspense>
              )
            },
            {
              path: RouterPath.HistoryPurchase,
              element: (
                <Suspense fallback={<LoadingArea />}>
                  <ProtectedRoute>
                    <HistoryPurchase />
                  </ProtectedRoute>
                </Suspense>
              )
            }
          ]
        },
        {
          path: RouterPath.ProductDetail,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            </Suspense>
          )
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    },
    {
      path: RouterPath.Cart,
      element: <CartLayout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingArea />}>
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
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
              <RestricRoute>
                <Login />
              </RestricRoute>
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
              <RestricRoute>
                <Register />
              </RestricRoute>
            </Suspense>
          )
        }
      ]
    }
  ]);
  return routerElement;
}
