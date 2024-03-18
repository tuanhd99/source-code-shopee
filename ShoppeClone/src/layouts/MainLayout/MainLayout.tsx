import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
