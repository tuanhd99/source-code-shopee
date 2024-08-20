import { Outlet } from "react-router-dom";
import CartHeader from "src/components/CartHeader";
import Footer from "../Footer";

function CartLayout() {
  return (
    <>
      <CartHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default CartLayout;
