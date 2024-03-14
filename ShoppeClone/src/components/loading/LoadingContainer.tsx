function LoadingContainer() {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-[#f9f9f9b3] bg-no-repeat flex flex-col shadow-lg z-[9999]  '>
      <div className='absolute flex flex-col justify-center items-center top-1/2 left-1/2 w-[360px] h-24 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2  '>
        <div className='border-2 mb-2 border-orange rounded-full h-10 w-10 animate-spin'>
          <div className='border-t-2 border-orange rounded-full h-full w-full '></div>
        </div>
        <div className='text-center '>Đang chờ...</div>
      </div>
    </div>
  );
}

export default LoadingContainer;
