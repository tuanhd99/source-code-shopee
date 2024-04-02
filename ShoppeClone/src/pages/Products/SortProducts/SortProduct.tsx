import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SortProduct() {
  return (
    <div className='bg-gray-300/30 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex items-center flex-wrap gap-2'>
          <div className=''>Sắp xếp theo</div>
          <button className='h-8 px-3 capitalize bg-orange text-white hover:bg-orange/80'>Phổ biến</button>
          <button className='h-8 px-3 capitalize bg-white text-black hover:bg-white/80'>Mới nhất</button>
          <button className='h-8 px-3 capitalize bg-white text-black hover:bg-white/80'>Bán chạy</button>
          <select name='' id='' className='h-8  px-4 capitalize bg-white text-sm text-black text-left'>
            <option>Giá</option>
            <option>Giá: thấp đến cao</option>
            <option>Giá: cao đến thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span className=''>/9</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 px-3 rounded-tl-sm rounded-bl-sm bg-white/40 hover:bg-slate-200 cursor-not-allowed border-slate-300'>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button className='h-8 px-3 rounded-tr-sm rounded-br-sm bg-white border-slate-300'>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortProduct;
