// eslint-disable-next-line import/no-unresolved

import { Link } from "react-router-dom";
import Image from "src/assets/Image";
import { RouterPath } from "src/router/util";

function Login() {
  // const { register, handleSubmit, formState } = useForm();

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  // });

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-3 mx-auto flex items-center flex-col '>
            <img className='h-[15rem] lg:h-[25rem]' src={Image.LogoShopee} alt='img' />
            <div className='text-2xl text-center text-white mb-1 -mt-10'>Shopee</div>
            <div className='text-center text-2xl text-white'>Nền tảng thương mại điện tử yêu thích ở Đông Nam Á.</div>
          </div>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'> </div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
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
