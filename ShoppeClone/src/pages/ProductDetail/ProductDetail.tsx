import { faAngleLeft, faAngleRight, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail, getProducts } from "src/apis/productAPI";
import { addToCart } from "src/apis/purchaseAPI";
import ProductRating from "src/components/ProductRating";
import QuantityController from "src/components/QuantityController/QuantityController";
import LoadingArea from "src/components/loading/LoadingArea";
import { queryClient } from "src/main";
import { StatusOrder } from "src/utils/constants";
import { formatShopeeSalesCount, formattedCurrency, getIDFromNameId, rateSale } from "src/utils/function";
import Product from "../Products/Product";
import { toast } from "react-toastify";

function ProductDetail() {
  const { nameId } = useParams();
  const id = getIDFromNameId(nameId as string);
  const { data: productDetail, isFetching } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id as string)
  });
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => addToCart(body)
  });
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5]);
  const [activeImg, setActiveImg] = useState("");
  const [buyCount, setBuyCount] = useState<number>(1);
  const imageRef = useRef<HTMLImageElement>(null);
  const product = productDetail?.data?.data;
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [currentIndexImage, product]
  );
  const queryConfig = { limit: "20", page: "1", category: product?.category._id };

  const { data: productSameData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => getProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product)
  });

  useEffect(() => {
    if (product && product.image.length > 0) {
      setActiveImg(product.images[0]);
    }
  }, [product]);
  if (!product) return null;

  const handleHoverImg = (img: string) => {
    setActiveImg(img);
  };

  const handleNextImg = () => {
    if (currentIndexImage[1] < product.images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };
  const handlePrevImg = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const handleZoom = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const image = imageRef.current as HTMLImageElement;
    const rect = event.currentTarget.getBoundingClientRect();

    // Cách 1 : Lấy offsetX và offsetY và sử lí bubble event
    // const { offsetX, offsetY } = event.nativeEvent;
    // Cách 2 : Bất chấp bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX);
    const offsetY = event.pageY - (rect.y + window.scrollY);
    const { naturalHeight, naturalWidth } = image;
    const { height, width } = rect;
    const top = offsetY * (1 - naturalHeight / height);
    const left = offsetX * (1 - naturalWidth / width);

    image.style.width = naturalWidth + "px";
    image.style.height = naturalHeight + "px";
    image.style.maxWidth = "unset";
    image.style.top = top + "px";
    image.style.left = left + "px";
  };

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute("style");
  };

  const handleOnChangeBuyCount = (value: number) => {
    setBuyCount(value);
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product._id as string },
      {
        onSuccess: () => {
          toast.success("Thêm sản phầm vào giỏ hàng thành công.");
          queryClient.invalidateQueries({
            queryKey: ["purchases", { status: StatusOrder.InCart }]
          });
        }
      }
    );
  };

  return (
    <div className='mt-28 bg-gray-200 py-6'>
      {isFetching ? (
        <LoadingArea />
      ) : (
        <>
          <div className='container'>
            <div className='bg-white p-4 shadow'>
              <div className='grid grid-cols-12 gap-9'>
                <div className='col-span-5'>
                  <div
                    className='relative w-full pt-[100%] shadow overflow-hidden'
                    onMouseMove={handleZoom}
                    onMouseLeave={handleRemoveZoom}
                  >
                    <img
                      src={activeImg}
                      alt={product.name}
                      className='absolute pointer-events-none top-0 left-0 w-full h-full object-cover bg-white cursor-zoom-in'
                      ref={imageRef}
                    />
                  </div>
                  <div className='relative mt-4 grid grid-cols-5 gap-1'>
                    <button className='px-2 absolute left-0 top-1/2 z-0 h-10 -translate-y-1/2 bg-black/20 text-white'>
                      <FontAwesomeIcon icon={faAngleLeft} onClick={handlePrevImg} />
                    </button>
                    {currentImages.map((item) => {
                      const isActive = item === activeImg;
                      return (
                        <div className='relative w-full pt-[100%]' key={item} onMouseEnter={() => handleHoverImg(item)}>
                          <img
                            src={item}
                            alt={product.name}
                            className='absolute top-0 left-0 w-full h-full object-cover bg-white'
                          />
                          {isActive && <div className='absolute inset-0 border-2 border-orange'></div>}
                        </div>
                      );
                    })}
                    <button className='px-2 absolute right-0 top-1/2 z-0 h-10 -translate-y-1/2 bg-black/20 text-white'>
                      <FontAwesomeIcon icon={faAngleRight} onClick={handleNextImg} />
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
                    <QuantityController
                      max={product.quantity}
                      onIncrease={handleOnChangeBuyCount}
                      onDecrease={handleOnChangeBuyCount}
                      onType={handleOnChangeBuyCount}
                      value={buyCount}
                    />
                    <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
                  </div>
                  <div className='mt-8 flex items-center gap-4'>
                    <button
                      className='flex h-12 items-center gap-2 justify-center rounded-sm border text-orange border-orange bg-orange/10 px-5 capitalize shadow-sm hover:bg-orange/5'
                      onClick={handleAddToCart}
                    >
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
          <div className='container'>
            <div className='mt-8 bg-white p-4 shadow'>
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
          <div className='container'>
            <div className='mt-8 bg-white p-4 shadow'>
              <div className='uppercase text-gray-400'>Có thể bạn cũng thích</div>
              <div className='mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                {productSameData?.data?.data?.products?.map((prod) => {
                  return (
                    <div className='col-span-1' key={prod._id}>
                      <Product prod={prod} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
