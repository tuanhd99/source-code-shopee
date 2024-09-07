import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LogoutAccount } from "src/auth/authAPI";
import { User } from "src/auth/models";
import { AppContext } from "src/contexts/App.Context";
import i18n from "src/i18n/i18n";
import { RouterPath } from "src/router/util";
import { getFromLocalStorage, removeKeyLocalStorage, saveToLocalStorage } from "src/utils/function";
import Popver from "../Popver";
import { useTranslation } from "react-i18next";
import { faChevronDown, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Image from "src/assets/Image";

function NavHeader() {
  const [language, setLanguage] = useState<string>(getFromLocalStorage("language"));
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const userInfo: User = getFromLocalStorage("user");
  const { t } = useTranslation();
  const logOutMutation = useMutation({
    mutationFn: LogoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false);
      removeKeyLocalStorage("refresh_token");
      removeKeyLocalStorage("access_token");
      removeKeyLocalStorage("user");
    }
  });
  const handleLogOut = () => {
    logOutMutation.mutate();
  };

  const handleChangeLanguage = (lg: string) => {
    i18n.changeLanguage(lg);
    setLanguage(lg);
    saveToLocalStorage("language", lg);
  };
  return (
    <div className='flex items-center justify-between '>
      <div className='flex gap-2'>
        <span className='border-r-2 pr-2 h-4 border-r-white'>{t("Download_App")}</span>
        <span>{t("Connect")}</span>
      </div>
      <div className='flex items-center gap-2 py-1 '>
        <Popver
          className='flex gap-2 items-center cursor-pointer'
          renderPopover={
            <div className='bg-white shadow-md rounded-sm border-gray-200'>
              <div className='flex flex-col '>
                <button
                  className='pl-2 pr-10 pt-2 pb-1 hover:text-orange text-sm hover:bg-gray-100'
                  onClick={() => handleChangeLanguage("vi")}
                >
                  Tiếng Việt
                </button>
                <button
                  className='pl-2 pr-10 pt-1 pb-2 hover:text-orange mt-1 text-sm hover:bg-gray-100'
                  onClick={() => handleChangeLanguage("en")}
                >
                  Tiếng Anh
                </button>
              </div>
            </div>
          }
        >
          <FontAwesomeIcon icon={faGlobe} fontSize={16} color='#ffffff' />
          <span>{language === "en" ? "Tiếng Anh" : "Tiếng Việt"}</span>
          <FontAwesomeIcon icon={faChevronDown} color='#ffffff' />
        </Popver>
        {isAuthenticated && (
          <Popver
            className='flex items-center justify-center'
            renderPopover={
              <div className='bg-white shadow-md rounded-sm border-gray-200'>
                <div className='flex flex-col gap-1'>
                  <Link
                    to={`${RouterPath.User}/${RouterPath.Profile}`}
                    className='block py-2 px-3 hover:text-cyan-300 hover:bg-gray-100'
                  >
                    {t("MyAccount")}
                  </Link>
                  <Link to='/' className='block py-2 px-3 hover:text-cyan-300 hover:bg-gray-100'>
                    {t("MyOrders")}
                  </Link>
                  <span
                    className='py-2 px-3  hover:text-cyan-300 cursor-pointer hover:bg-gray-100'
                    onClick={() => handleLogOut()}
                    aria-hidden='true'
                  >
                    {t("Logout")}
                  </span>
                </div>
              </div>
            }
          >
            <div className='w-6 h-6 flex shrink-0 mr-2'>
              <img className='w-full h-full cursor-pointer rounded-full' src={Image.Avatar} alt='avatar' />
            </div>
            <span>{userInfo?.email}</span>
          </Popver>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={RouterPath.Register} className='mx-3 capitalize hover:text-white/70'>
              {t("Register")}
            </Link>
            <Link
              to={RouterPath.Login}
              className='border-l-[1px] border-l-white/40 px-3 mr-3 capitalize hover:text-white/70'
            >
              {t("Login")}
            </Link>
          </div>
        )}

        <div className='flex items-center justify-center'></div>
      </div>
    </div>
  );
}

export default NavHeader;
