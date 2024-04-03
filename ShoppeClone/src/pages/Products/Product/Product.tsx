import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Product() {
  return (
    <Link>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img
            src='https://down-vn.img.susercontent.com/file/sg-11134201-23020-whqsix9qz8mv40_tn'
            alt=''
            className='absolute top-0 left-0 w-full h-full object-cover bg-white'
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>
            Áo Thun Thêu NOCTURNAL Galaxy Tee Cotton 100% Unisex Form Rộng Tay Lỡ Oversize Local Brand
          </div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>₫220.000</div>
            <div className=' ml-1 text-orange truncate'>₫180.000</div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full overflow-hidden' style={{ width: "50%" }}>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#ffa727" }} />
                </div>
                <FontAwesomeIcon icon={faStar} color='#d5d5d5' />
              </div>
            </div>
            <div className='ml-2 text-sm'>
              <span>5.66k</span>
              <span className='ml-1'>Đã bán </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
