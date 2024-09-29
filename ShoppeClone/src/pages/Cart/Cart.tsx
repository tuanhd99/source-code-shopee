import { useMutation, useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import keyBy from "lodash/keyBy";
import { Fragment, useContext, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { buyProduct, deleteProduct, getPurchases, updateProduct } from "src/apis/purchaseAPI";
import Image from "src/assets/Image";
import QuantityController from "src/components/QuantityController/QuantityController";
import { AppContext } from "src/contexts/App.Context";
import { RouterPath } from "src/router/util";
import { IPurChases } from "src/types/purchase.type";
import { StatusOrder } from "src/utils/constants";
import { formattedCurrency, generateNameId } from "src/utils/function";

export interface ExtendedPurchase extends IPurChases {
  disabled: boolean;
  checked: boolean;
}

function Cart() {
  const { extendedPurchase, setExtendedPurchase } = useContext(AppContext);
  const location = useLocation();
  const purchaseId = (location.state as { purchaseId: string } | null)?.purchaseId;

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ["purchases", { status: StatusOrder.InCart }],
    queryFn: () => getPurchases({ status: StatusOrder.InCart })
  });

  const updatePurchase = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      refetch();
    }
  });

  const buyProductMutation = useMutation({
    mutationFn: buyProduct,
    onSuccess: (data) => {
      refetch();
      toast.success(data.data.message);
    }
  });
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      refetch();
    }
  });

  const purchasesIncart = purchasesInCartData?.data.data;
  const isAllChecked = useMemo(() => extendedPurchase.every((purchase) => purchase.checked), [extendedPurchase]);
  const checkedPurcharses = useMemo(() => extendedPurchase.filter((item) => item.checked), [extendedPurchase]);
  const checkedPurcharseCount = checkedPurcharses.length;
  const totalCheckedPurcharsePrice = checkedPurcharses.reduce((result, current) => {
    return result + current.product.price * current.buy_count;
  }, 0);

  const totalCheckedPurcharseSavingPrice = useMemo(
    () =>
      checkedPurcharses.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count;
      }, 0),
    [checkedPurcharses]
  );

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseOject = keyBy(prev, "_id");
      return (
        purchasesIncart?.map((item) => {
          const isChoosenPurchaseFormLocation = purchaseId === item._id;
          console.log(isChoosenPurchaseFormLocation);

          return {
            ...item,
            disabled: false,
            checked: isChoosenPurchaseFormLocation || Boolean(extendedPurchaseOject[item._id]?.checked)
          };
        }) || []
      );
    });
  }, [purchaseId, purchasesIncart, setExtendedPurchase]);

  useEffect(() => {
    return () => {
      window.history.replaceState(null, "");
    };
  });

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

  const handleQuantity = (index: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[index];
      setExtendedPurchase(
        produce((draft) => {
          draft[index].disabled = true;
        })
      );
      updatePurchase.mutate({ product_id: purchase.product._id, buy_count: value });
    }
  };

  const handleTypeQuantity = (index: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[index].buy_count = value;
      })
    );
  };

  const handleDelete = (index: number) => {
    const purcharseId = extendedPurchase[index]._id;
    deleteProductMutation.mutate([purcharseId]);
  };

  const handledeleteManyPurchase = () => {
    const purcharseIds = checkedPurcharses.map((item) => item._id);
    deleteProductMutation.mutate(purcharseIds);
  };

  const buyPurcharses = () => {
    if (checkedPurcharses.length > 0) {
      const body = checkedPurcharses.map((item) => {
        return {
          product_id: item.product._id,
          buy_count: item.buy_count
        };
      });
      buyProductMutation.mutate(body);
    }
  };

  return (
    <div className='mt-28'>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          {extendedPurchase && extendedPurchase.length > 0 ? (
            <Fragment>
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
                  {Array.isArray(extendedPurchase) && extendedPurchase.length && (
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
                                  onIncrease={(value) => handleQuantity(index, value, value <= item.product.quantity)}
                                  onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value <= item.product.quantity &&
                                        value >= 1 &&
                                        value !== (purchasesIncart as IPurChases[])[index].buy_count
                                    )
                                  }
                                  disabled={item.disabled}
                                />
                              </div>
                              <div className='col=span-1'>{formattedCurrency(item.product.price * item.buy_count)}</div>
                              <div className='col-span-1'>
                                <button
                                  className='bg-none text-black transition-colors hover:text-orange'
                                  onClick={() => handleDelete(index)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className='sticky bottom-0 z-10 flex item items-center rounded-sm bg-white p-5 shadow border border-gray-100'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onClick={handleCheckAll}
                    />
                  </div>
                  <button className='mx-3 border-none bg-none'>Chọn tất cả ({extendedPurchase.length})</button>
                  <button className='mx-3 border-none bg-none' onClick={handledeleteManyPurchase}>
                    Xóa
                  </button>
                </div>
                <div className='flex items-center ml-auto'>
                  <div className='mr-3'>
                    <div className='flex item-center justify-end'>
                      <div className=''>Tổng thanh toán({checkedPurcharseCount} sản phẩm)</div>
                      <div className='ml-2 text-2xl text-orange'>{formattedCurrency(totalCheckedPurcharsePrice)}</div>
                    </div>
                    <div className='flex items-center text-sm justify-end'>
                      <div className='text-gray-500'>Tiết kiệm</div>
                      <div className='ml-6 text-orange'>{formattedCurrency(totalCheckedPurcharseSavingPrice)}</div>
                    </div>
                  </div>
                  <button
                    className='flex h-10 w-52 items-center justify-center text-sm uppercase bg-red-500 text-white hover:bg-red-600'
                    onClick={buyPurcharses}
                    disabled={buyProductMutation.isPending}
                  >
                    Mua hàng
                  </button>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className='flex items-center justify-center flex-col gap-4 p-3'>
              <img src={Image.NoItem} alt='no-item' className='w-20 h-20 object-cover' />
              <div className='font-bold text-gray-600 mt-5'>Giỏ hàng của bạn còn trống</div>
              <Link className='rounded-sm mt-5 bg-orange px-8 py-2 uppercase text-white hover:bg-orange/80'>
                Mua ngay
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
