import { faAngleLeft, faAngleRight, faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { getProductDetail } from "src/apis/productAPI";
import InputNumber from "src/components/InputNumber";
import ProductRating from "src/components/ProductRating";
import LoadingArea from "src/components/loading/LoadingArea";
import { formatShopeeSalesCount, formattedCurrency, rateSale } from "src/utils/function";

function ProductDetail() {
  const { id } = useParams();
  const { data: productDetail, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id as string)
  });
  const product = productDetail?.data?.data;
  if (!product) return null;

  return (
    <div className='mt-28 bg-gray-200 py-6'>
      {isFetching ? (
        <LoadingArea />
      ) : (
        <>
          <div className='bg-white p-4 shadow'>
            <div className='container'>
              <div className='grid grid-cols-12 gap-9'>
                <div className='col-span-5'>
                  <div className='relative w-full pt-[100%] shadow'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='absolute top-0 left-0 w-full h-full object-cover bg-white'
                    />
                  </div>
                  <div className='relative mt-4 grid grid-cols-5 gap-1'>
                    <button className='px-2 absolute left-0 top-1/2 z-10 h-10 -translate-y-1/2 bg-black/20 text-white'>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    {product.images.slice(0, 4).map((item, index) => {
                      const isActive = index === 0;
                      return (
                        <div className='relative w-full pt-[100%]' key={item}>
                          <img
                            src={item}
                            alt={product.name}
                            className='absolute top-0 left-0 w-full h-full object-cover bg-white'
                          />
                          {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                        </div>
                      );
                    })}
                    <button className='px-2 absolute right-0 top-1/2 z-10 h-10 -translate-y-1/2 bg-black/20 text-white'>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                  </div>
                </div>
                <div className='col-span-7'>
                  <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
                  <div className='mt-8 flex items-center'>
                    <div className='flex items-center'>
                      <span className='mr-1 border-b border-b-orange text-orange'>{product.rating}</span>
                      <ProductRating rating={product.rating} activeClassname='#ee4d2d' nonActiveClassname='#d5d5d5' />
                    </div>
                    <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                    <div>
                      <span>{formatShopeeSalesCount(product.sold)}</span>
                      <span className='ml-1 text-gray-500'>Đã bán</span>
                    </div>
                  </div>
                  <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                    <div className='text-gray-500 line-through'>
                      ₫{formattedCurrency(product.price_before_discount)}
                    </div>
                    <div className='ml-3 text-3xl font-medium text-orange'>{formattedCurrency(product.price)}</div>
                    <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text=sx font-semibold uppercase text-white'>
                      {rateSale(product.price_before_discount, product.price)} giảm
                    </div>
                  </div>
                  <div className='mt-8 flex items-center '>
                    <div className='capitalize text-gray-500'>số lượng</div>
                    <div className='ml-10 flex items-center'>
                      <button className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 tex-fray-600 px-2'>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <InputNumber
                        value={1}
                        classNameError='hidden'
                        classNameInput='h-8 w-14 border-t border-b border-gray-300 outline-none text-center p-1'
                      />
                      <button className='flex h-8 items-center justify-center rounded-l-sm border border-gray-300 tex-fray-600 px-2'>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
                  </div>
                  <div className='mt-8 flex items-center gap-4'>
                    <button className='flex h-12 items-center gap-2 justify-center rounded-sm border text-orange border-orange bg-orange/10 px-5 capitalize shadow-sm hover:bg-orange/5'>
                      <FontAwesomeIcon icon={faCartShopping} />
                      Thêm vào giỏ hàng
                    </button>
                    <button className='flex h-12 items-center gap-2 justify-center rounded-sm border text-white border-orange bg-orange px-5 capitalize shadow-sm hover:bg-orange/90'>
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-8 bg-white p-4 shadow'>
            <div className='container'>
              <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
              <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.description)
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
