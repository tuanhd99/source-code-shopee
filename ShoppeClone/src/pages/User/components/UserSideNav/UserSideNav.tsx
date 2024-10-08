import { faBagShopping, faKey, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Image from "src/assets/Image";
import { AppContext } from "src/contexts/App.Context";
import { RouterPath } from "src/router/util";
import { getAvatar } from "src/utils/function";

function UserSideNav() {
  const { profile } = useContext(AppContext);
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={RouterPath.Profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-black/10'>
          <img
            src={profile?.avatar ? getAvatar(profile?.avatar as string) : Image.DefaultImage}
            alt=''
            className='h-full w-full object-cover'
          ></img>
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={RouterPath.Profile} className='flex items-center gap-2 capitalize text-gray-500'>
            <FontAwesomeIcon icon={faPen} />
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={RouterPath.Profile}
          className='flex items-center gap-2 capitalize text-orange transition-colors' // Apply this class if isActive is true
        >
          <FontAwesomeIcon icon={faUser} />
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={RouterPath.HistoryPurchase}
          className='flex items-center gap-2 capitalize text-gray-600 transition-colors mt-4 '
        >
          <FontAwesomeIcon icon={faBagShopping} />
          Đơn mua
        </NavLink>
        <NavLink
          to={RouterPath.ChangePassword}
          className='flex items-center gap-2 capitalize text-gray-600 transition-colors mt-4 '
        >
          <FontAwesomeIcon icon={faKey} />
          Đổi mật khẩu
        </NavLink>
      </div>
    </div>
  );
}

export default UserSideNav;
