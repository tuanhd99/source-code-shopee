// eslint-disable-next-line import/no-unresolved

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Image from "src/assets/Image";
import { RouterPath } from "src/router/util";
import { validateLoginOrRegister } from "src/utils/validate";

interface IFormInputs {
  email: string;
  password: string;
  confirm_password: string;
}
function Register() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInputs>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const renderShowHideButton = () => {
    if (watch("password")) {
      if (isShowPassword) {
        return (
          <svg
            data-slot='icon'
            fill='none'
            strokeWidth='1.5'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            className='max-w-5 absolute top-3.5 right-4'
            onClick={() => setIsShowPassword(false)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
            ></path>
            <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'></path>
          </svg>
        );
      } else {
        return (
          <svg
            data-slot='icon'
            fill='none'
            strokeWidth='1.5'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            className='max-w-5 absolute top-3.5 right-4'
            onClick={() => setIsShowPassword(true)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
            ></path>
          </svg>
        );
      }
    }
    return null;
  };

  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-3 mx-auto flex items-center flex-col '>
            <img className='h-[15rem] lg:h-[25rem]' src={Image.LogoShopee} alt='img' />
            <div className='text-2xl text-center text-white mb-1 -mt-10'>Shopee</div>
            <div className='text-center text-2xl text-white'>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á.</div>
          </div>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Kí</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register("email", validateLoginOrRegister.email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-2 relative'>
                <input
                  type={isShowPassword ? "text" : "password"}
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  {...register("password", validateLoginOrRegister.password)}
                />
                {renderShowHideButton()}

                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  autoComplete='on'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Confirm Password'
                  {...register("confirm_password", validateLoginOrRegister.confirm_password)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng kí
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-slate-400 opacity-2'>Bạn đã có tài khoản?</span>
                  <Link to={RouterPath.Login} className='text-red-400 ml-1'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
