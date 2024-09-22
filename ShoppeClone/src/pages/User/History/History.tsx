import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { createSearchParams, Link } from "react-router-dom";
import { getPurchases } from "src/apis/purchaseAPI";
import useQueyParams from "src/hooks/useQueyParams";
import { RouterPath } from "src/router/util";
import { StatusOrder } from "src/utils/constants";
import { formattedCurrency, generateNameId } from "src/utils/function";

const purchaseTabs = [
  { status: StatusOrder.All, name: "Tất cả" },
  { status: StatusOrder.Pending, name: "Chờ xác nhận" },
  { status: StatusOrder.Confirming, name: "Chờ lấy hàng" },
  { status: StatusOrder.Transporting, name: "Đang giao" },
  { status: StatusOrder.Deliered, name: "Đã giao" },
  { status: StatusOrder.Cancel, name: "Đã hủy" }
];

export default function History() {
  const queryParams: { status?: string } = useQueyParams();
  const status: number = Number(queryParams.status) || StatusOrder.All;

  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status }],
    queryFn: () => getPurchases({ status: status as StatusOrder })
  });

  const purchasesInCart = purchasesInCartData?.data.data;

  const purchaseTabsLink = purchaseTabs.map((tab) => {
    const newQueryParams = { status: tab.status };
    // const searchParams = new URLSearchParams(newQueryParams as any);
    console.log(newQueryParams);
    console.log(
      createSearchParams({
        status: String(tab.status)
      }).toString()
    );

    return (
      <Link
        key={tab.status}
        to={{
          pathname: RouterPath.HistoryPurchase,
          search: createSearchParams({
            status: String(tab.status)
          }).toString()
          // search: `?${createSearchParams(searchParams).toString()}`
        }}
        className={classNames("flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center", {
          "border-b-orange text-orange": status === tab.status,
          "border-b-black/10 text-gray-900": status !== tab.status
        })}
      >
        {tab.name}
      </Link>
    );
  });

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${RouterPath.Index}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formattedCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formattedCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formattedCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
