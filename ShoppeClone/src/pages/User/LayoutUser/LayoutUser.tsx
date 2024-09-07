import { Outlet } from "react-router-dom";
import UserSideNav from "../components/UserSideNav";

function LayoutUser() {
  return (
    <>
      <UserSideNav />
      <Outlet />
    </>
  );
}

export default LayoutUser;
