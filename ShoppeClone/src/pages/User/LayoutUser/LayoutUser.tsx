import { Outlet } from "react-router-dom";
import UserSideNav from "../components/UserSideNav";

function LayoutUser() {
  return (
    <div className='bg-neutral-100 py-16 text-sm text-gray-600 mt-28'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:cols-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutUser;
