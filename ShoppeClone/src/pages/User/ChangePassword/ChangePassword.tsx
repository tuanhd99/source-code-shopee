import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateProfile } from "src/apis/userAPI";
import { schemaPassword, SchemaPassword } from "src/utils/validate";
// import { userSchema, UserSchema } from "src/utils/rules";
// import { ObjectSchema } from "yup";

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<SchemaPassword>({
    defaultValues: {
      password: "",
      confirm_password: "",
      new_password: ""
    },
    resolver: yupResolver<SchemaPassword>(schemaPassword)
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => updateProfile(data)
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ["confirm_password"]));
      toast.success(res.data.message);
      reset();
    } catch (error) {
      const formError = (error as any).response?.data.data;
      if (formError) {
        Object.keys(formError).forEach((key) => {
          setError(key as keyof SchemaPassword, {
            message: formError[key as keyof FormData],
            type: "Server"
          });
        });
      }
    }
  });

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                {...register("password")}
                name='password'
                type='password'
                placeholder='Mật khẩu cũ'
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.password?.message}</div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                {...register("new_password")}
                name='new_password'
                type='password'
                placeholder='Mật khẩu mới'
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.new_password?.message}</div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Nhập lại mật khẩu</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                {...register("confirm_password")}
                name='confirm_password'
                type='password'
                placeholder='Nhập lại mật khẩu'
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.confirm_password?.message}</div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
