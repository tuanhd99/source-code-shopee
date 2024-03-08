import { useRoutes } from 'react-router-dom';
import { RouterPath } from './util';
import Products from 'src/pages/Products';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import RegisterLayout from 'src/layouts/RegisterLayout';

export default function useRounterElement() {
  const routerElement = useRoutes([
    {
      path: RouterPath.ProductsList,
      element: <Products />
    },
    {
      path: RouterPath.Login,
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: RouterPath.Register,
      element: <Register />
    }
  ]);
  return routerElement;
}
