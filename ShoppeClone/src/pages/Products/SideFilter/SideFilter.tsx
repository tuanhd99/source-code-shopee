import { faBars, faCaretRight, faFilter, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import InputNumber from "src/components/InputNumber";
import { RouterPath } from "src/router/util";
import { Category } from "src/types/category.type";
import { ProductListConfig } from "src/types/product.type";

export interface IPropCategory {
  categories: Category[];
  queryConfig: ProductListConfig;
}
type FormData = {
  price_min: string;
  price_max: string;
};

// Rule validate
// Nếu price_min and price_max thì price_max lớn or bằng price max
// còn không thì có price_min thì không có price_max và ngược lại

function SideFilter(props: IPropCategory) {
  const { queryConfig, categories } = props;
  const { category } = queryConfig;
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: ""
    }
  });

  const handleOnClick = (id: string) => {
    const newQueryParams = { ...queryConfig, category: id };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  };

  const handOnSubmitPrice = handleSubmit((data) => {
    if (data.price_max && data.price_min) {
      const newQueryParams = { ...queryConfig, price_max: data.price_max, price_min: data.price_min };
      const searchParams = new URLSearchParams(newQueryParams as any);
      navigate({
        pathname: RouterPath.Index,
        search: `?${createSearchParams(searchParams).toString()}`
      });
    }
  });
  return (
    <div className='py-4'>
      <Link
        to={RouterPath.Index}
        className={classNames("flex items-center font-bold", {
          "text-orange": !category
        })}
      >
        <FontAwesomeIcon icon={faBars} />
        <span className='ml-3'>Tất cả danh mục</span>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4'>
        <ul>
          {categories?.map((item) => {
            const isActive = item._id === category;
            return (
              <li className='py-2 pl-2' key={item._id}>
                <span
                  className={classNames(" gap-3 flex cursor-pointer", {
                    "text-orange font-semibold": isActive
                  })}
                  onClick={() => handleOnClick(item._id)}
                  aria-hidden
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>
        <Link className='flex items-center font-bold mt-4 uppercase'>
          <FontAwesomeIcon icon={faFilter} className='w-3 h-4' />
          <span className='ml-3'>Bộ lọc tìm kiếm</span>
        </Link>
        <div className='bg-gray-300 h-[1px] my-4'></div>
        <div className='my-5'>
          <div>Khoảng giá</div>
          <form className='mt-2' onSubmit={handOnSubmitPrice}>
            <div className='flex items-start'>
              <Controller
                control={control}
                name='price_min'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      classNameInput='grow p-1 w-full outline-none border border-gray 300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      placeholder='₫ TỪ'
                      className='grow'
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                      value={field.value}
                    />
                  );
                }}
              />
              <div className='mx-2 mt-1 shrink-0'>-</div>
              <Controller
                control={control}
                name='price_max'
                render={({ field }) => {
                  return (
                    <InputNumber
                      type='text'
                      className='grow'
                      classNameInput='grow p-1 w-full outline-none border border-gray 300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                      placeholder='₫ ĐẾN'
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                      value={field.value}
                    />
                  );
                }}
              />
            </div>
            {/* <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div> */}
            <button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
              Áp dụng
            </button>
          </form>
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
