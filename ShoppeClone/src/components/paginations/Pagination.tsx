import { faAngleLeft, faAngleRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { RouterPath } from "src/router/util";
import { ProductListConfig } from "src/types/product.type";

interface IPropPagination {
  page_size?: number;
  queryConfig: ProductListConfig;
}
function Pagination(prop: IPropPagination) {
  const { queryConfig, page_size } = prop;
  const [currentPage, setCurrentPage] = useState<number>(Number(queryConfig?.page));
  const navigate = useNavigate();
  const pageNumberLitmit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  const handleClickPage = (newPageInput: number) => {
    const newQueryParams = { ...queryConfig, page: Number(newPageInput) };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
    setCurrentPage(newPageInput);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    handleClickPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLitmit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLitmit);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    handleClickPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLitmit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLitmit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLitmit);
    }
  };

  const handleViewMore = () => {
    setCurrentPage(currentPage + 1);
    handleClickPage(currentPage + 1);
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLitmit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLitmit);
  };
  const handleViewLess = () => {
    setCurrentPage(currentPage - 1);
    handleClickPage(currentPage - 1);
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLitmit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLitmit);
  };

  const onRenderPageNumber = () => {
    if (!page_size) return null;
    const pages = Array(page_size)
      .fill(0)
      .map((_, index) => index + 1);
    let pageIncreMentBtn = null;
    if (pages.length > maxPageNumberLimit) {
      pageIncreMentBtn = (
        <button
          className='h-10 px-4 rounded-t-md bg-white/40 hover:bg-slate-200 cursor-pointer'
          onClick={handleViewMore}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      );
    }
    let pageDecreMentBtn = null;
    if (minPageNumberLimit >= 1) {
      pageDecreMentBtn = (
        <button
          className='h-10 px-4 rounded-t-md bg-white/40 hover:bg-slate-200 cursor-pointer'
          onClick={handleViewLess}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      );
    }
    return (
      <div className='text-md'>
        {pageDecreMentBtn}
        {pages.map((item) => {
          if (item < maxPageNumberLimit + 1 && item > minPageNumberLimit) {
            return (
              <button
                className={`h-10 px-4 rounded-md-sm rounded-br-sm  border border-slate-300 hover:bg-slate-200 ${currentPage === item ? "bg-gray-400" : "bg-white"}  `}
                key={item}
                onClick={() => handleClickPage(item)}
              >
                {item}
              </button>
            );
          }
          return null;
        })}
        {pageIncreMentBtn}
      </div>
    );
  };
  return (
    <div className='flex items-center justify-center mt-5'>
      <button
        className='h-10 px-4 rounded-md-sm rounded-bl-sm bg-white/40 hover:bg-slate-200 border-slate-300'
        disabled={currentPage === 1}
        onClick={handlePrevPage}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {onRenderPageNumber()}

      <button
        className='h-10 px-4 rounded-md-sm rounded-br-sm bg-white border-slate-300'
        onClick={handleNextPage}
        disabled={currentPage === page_size}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}

export default Pagination;
