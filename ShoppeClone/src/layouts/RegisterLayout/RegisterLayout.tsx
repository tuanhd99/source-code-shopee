import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import RegisterHeader from "./RegisterHeader";

function RegisterLayout() {
  return (
    <>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default RegisterLayout;
