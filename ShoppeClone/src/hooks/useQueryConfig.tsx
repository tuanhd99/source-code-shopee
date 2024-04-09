import { ProductListConfig } from "src/types/product.type";

import isUndefined from "lodash/isUndefined";
import omitBy from "lodash/omitBy";
import useQueyParams from "./useQueyParams";

export type QueryConfig = {
  [key in keyof ProductListConfig]: string | undefined;
};
function useQueryConfig() {
  const queryParams: QueryConfig = useQueyParams();
  console.log(queryParams);

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit || "20",
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  );
  return { queryConfig };
}
export default useQueryConfig;
