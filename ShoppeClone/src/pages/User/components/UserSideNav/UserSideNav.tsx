import { faBagShopping, faKey, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "src/assets/Image";
import { AppContext } from "src/contexts/App.Context";
import { RouterPath } from "src/router/util";

function UserSideNav() {
  const { profile } = useContext(AppContext);
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={RouterPath.Profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-black/10'>
          <img
            src={profile?.avatar ? profile.avatar : Image.DefaultImage}
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
        <Link to={RouterPath.Profile} className='flex items-center gap-2 capitalize text-orange transition-colors '>
          <FontAwesomeIcon icon={faUser} />
          Tài khoản của tôi
        </Link>
        <Link
          to={RouterPath.HistoryPurchase}
          className='flex items-center gap-2 capitalize text-gray-600 transition-colors mt-4 '
        >
          <FontAwesomeIcon icon={faBagShopping} />
          Đơn mua
        </Link>
        <Link
          to={RouterPath.ChangePassword}
          className='flex items-center gap-2 capitalize text-gray-600 transition-colors mt-4 '
        >
          <FontAwesomeIcon icon={faKey} />
          Đổi mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default UserSideNav;
