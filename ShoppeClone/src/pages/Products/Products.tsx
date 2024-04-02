import Product from "./Product";
import SideFilter from "./SideFilter";
import SortProduct from "./SortProducts";

export default function Products() {
  return (
    <div className='bg-gray-200 py-6 h-screen w-full'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-3'>
            <SideFilter />
          </div>
          <div className='col-span-9'>
            <SortProduct />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, index) => {
                  return (
                    <div className='col-span-1' key={index}>
                      <Product />
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
