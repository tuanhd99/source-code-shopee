import { useQuery } from "@tanstack/react-query";
import { getProducts } from "src/apis/productAPI";
import useQueyParams from "src/hooks/useQueyParams";
import Product from "./Product";
import SideFilter from "./SideFilter";
import SortProduct from "./SortProducts";

export default function Products() {
  const queryParams = useQueyParams();
  console.log(queryParams);

  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      return getProducts(queryParams);
    }
  });
  console.log(data);

  return (
    <div className='bg-gray-200 py-6 w-full h-100vh-h-28 mt-28'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-3'>
            <SideFilter />
          </div>
          <div className='col-span-9'>
            <SortProduct />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {data?.data?.data?.products?.map((prod) => {
                return (
                  <div className='col-span-1' key={prod._id}>
                    <Product prod={prod} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
