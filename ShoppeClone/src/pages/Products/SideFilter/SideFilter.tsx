import { faBars, faCaretRight, faFilter, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { RouterPath } from "src/router/util";

function SideFilter() {
  return (
    <div className='py-4'>
      <Link to={RouterPath.Index} className='flex items-center font-bold'>
        <FontAwesomeIcon icon={faBars} />
        <span className='ml-3'>Tất cả danh mục</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'>
        <ul>
          <li className='py-2 pl-2'>
            <Link to={RouterPath.Index} className='text-orange font-semibold gap-3 flex'>
              <FontAwesomeIcon icon={faCaretRight} />
              Thời trang nam
            </Link>
          </li>
          <li className='py-2 pl-2'>
            <Link to={RouterPath.Index} className='px-2'>
              Điện thoại
            </Link>
          </li>
          <li className='py-2 pl-2'>
            <Link to={RouterPath.Index} className='px-2'>
              Quần áo
            </Link>
          </li>
        </ul>
        <Link className='flex items-center font-bold mt-4 uppercase'>
          <FontAwesomeIcon icon={faFilter} className='w-3 h-4' />
          <span className='ml-3'>Bộ lọc tìm kiếm</span>
        </Link>
        <div className='bg-gray-300 h-[1px] my-4'></div>
        <div className='my-5'>
          <div>Khoảng giá</div>
          <div className='flex item-center mt-2'>
            <input
              type='text'
              className='grow p-1 w-full outline-none border border-gray 300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='₫ TỪ'
            />
            <div className='mx-2 mt-1 shrink-0'>-</div>
            <input
              type='text'
              className='grow p-1 w-full outline-none border border-gray 300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='₫ ĐẾN'
            />
          </div>
          <button className='uppercase p-2 mt-3 w-full bg-orange text-white flex justify-center items-center text-sm hover:bg-orange/80   '>
            Áp dụng
          </button>
        </div>
        <div className='bg-gray-300 h-[1px] my-4'></div>
        <div className='text-sm'>Đánh giá</div>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return <FontAwesomeIcon icon={faStar} key={index} style={{ color: "#ffa727" }} />;
              })}
            <span> trở lên</span>
          </li>
          <li className='py-1 pl-2'>
            {Array(3)
              .fill(0)
              .map((_, index) => {
                return <FontAwesomeIcon icon={faStar} key={index} style={{ color: "#ffa727" }} />;
              })}
            <span> trở lên</span>
          </li>
        </ul>
        <div className='bg-gray-300 h-[1px] my-4'></div>
        <button className='uppercase p-2 mt-3 w-full bg-orange text-white flex justify-center items-center text-sm hover:bg-orange/80   '>
          Xóa tất cả
        </button>
      </div>
    </div>
  );
}

export default SideFilter;
