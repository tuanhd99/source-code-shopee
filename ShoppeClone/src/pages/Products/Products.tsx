import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/apis/productAPI";
import Pagination from "src/components/paginations";
import useQueryConfig from "src/hooks/useQueryConfig";
import { ProductListConfig } from "src/types/product.type";
import Product from "./Product";
import SideFilter from "./SideFilter";
import SortProduct from "./SortProducts";

export default function Products() {
  const { queryConfig } = useQueryConfig();

  const { data } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => {
      return getProducts(queryConfig as ProductListConfig);
    }
  });

  return (
    <div className='bg-gray-200 py-6 w-full h-100vh-h-28 mt-28'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-3'>
            <SideFilter />
          </div>
          <div className='col-span-9'>
            <SortProduct queryConfig={queryConfig} page_size={data?.data?.data?.pagination.page_size} />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data?.data?.data?.products?.map((prod) => {
                return (
                  <div className='col-span-1' key={prod._id}>
                    <Product prod={prod} />
                  </div>
                );
              })}
            </div>
            <Pagination queryConfig={queryConfig} page_size={data?.data?.data?.pagination.page_size} />
          </div>
        </div>
      </div>
    </div>
  );
}
