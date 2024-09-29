import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import omit from "lodash/omit";
import { createSearchParams, useNavigate } from "react-router-dom";
import { IPropPagination } from "src/components/paginations/Pagination";
import { RouterPath } from "src/router/util";

function SortProduct(props: IPropPagination) {
  const { page_size, queryConfig } = props;
  const { sort_by = "createdAt", order, page } = queryConfig;
  const pageCurrent = Number(page);
  const navigate = useNavigate();

  const isActiveSortBy = (sortByValue: string) => {
    return sort_by === sortByValue;
  };

  const handleSort = (sortByValue: string) => {
    const newQueryParams = { ...queryConfig, sort_by: sortByValue };
    const filteredSearchParams = omit(newQueryParams, ["order"]);
    const searchParams = new URLSearchParams(filteredSearchParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  };

  const haneOnchangeSelectPrice = (orderInput: string) => {
    console.log(orderInput);

    const newQueryParams = { ...queryConfig, order: orderInput, sort_by: "price" };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  };
  const handlePrevPage = () => {
    const newQueryParams = { ...queryConfig, page: Number(pageCurrent - 1) };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  };
  const handleNextPage = () => {
    const newQueryParams = { ...queryConfig, page: Number(pageCurrent + 1) };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  };
  return (
    <div className='bg-gray-300/30 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between'>
        <div className='flex items-center flex-wrap gap-2'>
          <div className=''>Sắp xếp theo</div>
          <button
            className={classNames("h-8 px-3 capitalize text-center text-sm", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy("view"),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy("view")
            })}
            onClick={() => handleSort("view")}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-3 capitalize text-center text-sm", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy("createdAt"),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy("createdAt")
            })}
            onClick={() => handleSort("createdAt")}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-3 capitalize text-center text-sm", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy("sold"),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy("sold")
            })}
            onClick={() => handleSort("sold")}
          >
            Bán chạy
          </button>
          <select
            className={classNames("h-8  px-4 capitalize text-sm text-left outline-none", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy("price"),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy("price")
            })}
            value={order || ""}
            onChange={(e) => haneOnchangeSelectPrice(e.target.value)}
          >
            <option disabled value={""} className='bg-white text-black'>
              Giá
            </option>
            <option value={"asc"} className='bg-white text-black'>
              Giá: thấp đến cao
            </option>
            <option value={"desc"} className='bg-white text-black'>
              Giá: cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span className=''>/{page_size}</span>
          </div>
          <div className='ml-2'>
            <button
              className={`h-8 px-3 rounded-tl-sm rounded-bl-sm  hover:bg-slate-200 ${Number(page) === 1 ? "cursor-not-allowed bg-white/40" : "bg-white"}`}
              onClick={() => handlePrevPage()}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
              className='h-8 px-3 rounded-tr-sm rounded-br-sm bg-white border-slate-300'
              onClick={() => handleNextPage()}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortProduct;
