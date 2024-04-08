import { Link } from "react-router-dom";
import ProductRating from "src/components/ProductRating";
import { Product as ProductType } from "src/types/product.type";
import { formatShopeeSalesCount, formattedCurrency } from "src/utils/function";

interface IProps {
  prod: ProductType;
}

function Product({ prod }: IProps) {
  return (
    <Link>
      <div className='bg-white shadow rounded-sm hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden'>
        <div className='w-full pt-[100%] relative'>
          <img src={prod.image} alt={prod.name} className='absolute top-0 left-0 w-full h-full object-cover bg-white' />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>{prod.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>{`${formattedCurrency(prod.price_before_discount)}`}</div>
            <div className=' ml-1 text-orange truncate'>{`${formattedCurrency(prod.price)}`}</div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={prod.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatShopeeSalesCount(prod.sold)}</span>
              <span className='ml-1'>Đã bán </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
