import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BodyUpdateProfile, getProfile, updateProfile } from "src/apis/userAPI";
import Image from "src/assets/Image";
import InputNumber from "src/components/InputNumber";
import { schemaUserProfile, SchemaUserProfile } from "src/utils/validate";
import DateSelect from "../components/DateSelect";
import { toast } from "react-toastify";
import { saveToLocalStorage } from "src/utils/function";
import LoadingArea from "src/components/loading/LoadingArea";
import { AppContext } from "src/contexts/App.Context";

// function Info() {
//   const {
//     register,
//     control,
//     formState: { errors }
//   } = useFormContext<FormData>();
//   return (
//     <Fragment>
//       <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
//         <div className='sm:w-[80%] sm:pl-5'>
//           <Input
//             classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
//             register={register}
//             name='name'
//             placeholder='Tên'
//             errorMessage={errors.name?.message}
//           />
//         </div>
//       </div>
//       <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
//         <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
//         <div className='sm:w-[80%] sm:pl-5'>
//           <Controller
//             control={control}
//             name='phone'
//             render={({ field }) => (
//               <InputNumber
//                 classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
//                 placeholder='Số điện thoại'
//                 errorMessage={errors.phone?.message}
//                 {...field}
//                 onChange={field.onChange}
//               />
//             )}
//           />
//         </div>
//       </div>
//     </Fragment>
//   );
// }

type FormData = SchemaUserProfile;
// type FormDataError = Omit<FormData, "date_of_birth"> & {
//   date_of_birth?: string;
// };

// Flow 1:
// Nhấn upload: upload lên server luôn => server trả về url ảnh
// Nhấn submit thì gửi url ảnh cộng với data lên server

// Flow 2:
// Nhấn upload: không upload lên server
// Nhấn submit thì tiến hành upload lên server, nếu upload thành công thì tiến hành gọi api updateProfile

export default function Profile() {
  const { setProfile } = useContext(AppContext);
  // const [file, setFile] = useState<File>();

  // const previewImage = useMemo(() => {
  //   return file ? URL.createObjectURL(file) : "";
  // }, [file]);

  const {
    data: profileData,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile
  });

  const UpdateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => updateProfile(body)
  });
  const profile = profileData?.data.data;
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver<FormData>(schemaUserProfile)
  });
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
    // setError
  } = methods;

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("phone", profile.phone || "");
      setValue("address", profile.address || "");
      setValue("avatar", profile.avatar || "");
      setValue("date_of_birth", profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1));
    }
  }, [profile, setValue]);
  const onSubmit = handleSubmit(async (data) => {
    const res = await UpdateProfileMutation.mutateAsync({
      name: data.name ?? "",
      address: data.address ?? "",
      phone: data.phone ?? "",
      date_of_birth: data.date_of_birth?.toISOString()
    });
    refetch();
    saveToLocalStorage("user", res.data?.data);
    setProfile(res.data.data);
    toast.success(res.data.message);
  });

  // const handleChangeFile = (file?: File) => {
  //   setFile(file);
  // };
  if (isFetching) {
    return <LoadingArea />;
  }
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      {/* <FormProvider {...methods}> */}
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Tên'
                autoComplete='on'
                {...register("name")}
                value={watch("name")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.name?.message}</div>
            </div>
          </div>
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số Điện Thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                      placeholder='Số điện thoại'
                      value={field.value}
                      errorMessage={errors.phone?.message}
                    />
                  );
                }}
              />
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <input
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Địa chỉ'
                autoComplete='on'
                {...register("address")}
                value={watch("address")}
              />
              <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.address?.message}</div>
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange} />
            )}
          />
          <div className='mt-4 flex flex-col flex-wrap sm:flex-row'>
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
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                // src={previewImage || getAvatarUrl(avatar)}
                src={profile?.avatar ? profile.avatar : Image.DefaultImage}
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            {/* <InputFile onChange={handleChangeFile} /> */}
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
            <button className='h-10 items-center justify-end rounded-sm text-sm text-gray-600 border bg-white shadow-sm px-6'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
      {/* </FormProvider> */}
    </div>
  );
}
