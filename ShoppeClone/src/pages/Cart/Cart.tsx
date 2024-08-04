import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPurchases } from "src/apis/purchaseAPI";
import QuantityController from "src/components/QuantityController/QuantityController";
import { RouterPath } from "src/router/util";
import { IPurChases } from "src/types/purchase.type";
import { StatusOrder } from "src/utils/constants";
import { formattedCurrency, generateNameId } from "src/utils/function";
import { produce } from "immer";

interface ExtendedPurchase extends IPurChases {
  disable: boolean;
  checked: boolean;
}

function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([]);
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status: StatusOrder.InCart }],
    queryFn: () => getPurchases({ status: StatusOrder.InCart })
  });

  const purchasesIncart = purchasesInCartData?.data.data;
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase]);

  useEffect(() => {
    setExtendedPurchase(
      purchasesIncart?.map((item) => ({
        ...item,
        disable: false,
        checked: false
      })) || []
    );
  }, [purchasesIncart]);

  const handleChecked = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked
      }))
    );
  };

  return (
    <div className='mt-28'>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6 '>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='accent-orange h-5 w-5'
                        checked={isAllChecked}
                        onClick={handleCheckAll}
                      />
                    </div>
                    <div className='flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid text-center grid-cols-5'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchase?.map((item, index) => (
                  <div
                    className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                    key={item._id}
                  >
                    <div className='col-span-6 '>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='accent-orange h-5 w-5'
                            checked={item.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${RouterPath.Index}${generateNameId({ name: item.product.name, id: item._id })}`}
                            >
                              <img alt={item.product.name} src={item.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pt-2 pb-2'>
                              <Link
                                to={`${RouterPath.Index}${generateNameId({ name: item.product.name, id: item._id })}`}
                                className='line-clamp-2'
                              >
                                {item.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 item-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              {formattedCurrency(item.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>{formattedCurrency(item.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={item.product.quantity}
                            value={item.buy_count}
                            classNameWrapper='flex item-center'
                          />
                        </div>
                        <div className='col=span-1'>{formattedCurrency(item.product.price * item.buy_count)}</div>
                        <div className='col-span-1'>
                          <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 flex item items-center rounded-sm bg-white p-5 shadow border border-gray-100'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center'>
                <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} />
              </div>
              <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                Chọn tất cả ({extendedPurchase.length})
              </button>
              <button className='mx-3 border-none bg-none'>Xóa</button>
            </div>
            <div className='flex items-center ml-auto'>
              <div className='mr-3'>
                <div className='flex item-center justify-end'>
                  <div className=''>Tổng thanh toán(0 sản phẩm)</div>
                  <div className='ml-2 text-2xl text-orange'>138000</div>
                </div>
                <div className='flex items-center text-sm justify-end'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-orange'>128000</div>
                </div>
              </div>
              <button className='flex h-10 w-52 items-center justify-center text-sm uppercase bg-red-500 text-white hover:bg-red-600'>
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
