// eslint-disable-next-line import/no-unresolved

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "src/assets/Image";
import { LoginAccount } from "src/auth/authAPI";
import { ResponseApi } from "src/auth/models";
import LoadingContainer from "src/components/loading/LoadingContainer";
import { AppContext } from "src/contexts/App.Context";
import { RouterPath } from "src/router/util";
import { NameField } from "src/utils/enum";
import { saveToLocalStorage } from "src/utils/function";
import { SchemaLogin, isAxiosUnprocessableEntity, schemaLogin } from "src/utils/validate";

function Login() {
  type IFormInputs = SchemaLogin;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm<IFormInputs>({
    resolver: yupResolver(schemaLogin)
  });
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { setIsAuthenticated } = useContext(AppContext);

  const LoginAccountMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => LoginAccount(body)
  });
  const onSubmit = handleSubmit((data) => {
    LoginAccountMutation.mutate(data, {
      onSuccess: (response) => {
        const { data } = response;
        saveToLocalStorage("access_token", data.data?.access_token || "");
        saveToLocalStorage("refresh_token", data.data?.refresh_token || "");
        saveToLocalStorage("user", data.data?.user);
        setIsAuthenticated(true);
        navigate("/");
        toast.success("Đăng nhập thành công");
      },
      onError(error) {
        if (isAxiosUnprocessableEntity<ResponseApi<IFormInputs>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof IFormInputs, {
                message: formError[key as keyof IFormInputs]
              });
            });
          }
        }
      }
    });
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
            className='max-w-5 absolute top-3.5 right-4 cursor-pointer'
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
      }
      return (
        <svg
          data-slot='icon'
          fill='none'
          strokeWidth='1.5'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='max-w-5 absolute top-3.5 right-4 cursor-pointer'
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
  };
  return (
    <div className='bg-orange'>
      {LoginAccountMutation.isPending ? <LoadingContainer /> : null}
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-3 mx-auto flex items-center flex-col '>
            <img className='h-[15rem] lg:h-[25rem]' src={Image.LogoShopee} alt='img' />
            <div className='text-2xl text-center text-white mb-1 -mt-10'>Shopee</div>
            <div className='text-center text-2xl text-white'>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á.</div>
          </div>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  autoComplete='on'
                  {...register(NameField.Email)}
                />
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.email?.message}</div>
              </div>
              <div className='mt-3 relative'>
                <input
                  type={isShowPassword ? "text" : "password"}
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register(NameField.Password)}
                />
                {renderShowHideButton()}
                <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                  <Link to={RouterPath.Register} className='text-red-400 ml-1'>
                    Đăng kí
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

export default Login;
