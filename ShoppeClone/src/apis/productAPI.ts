import fetHandler from "src/config/configAxios";
import { Product, ProductList, ProductListConfig } from "src/types/product.type";
import { SuccessResponse } from "src/types/utils.type";

export const getProducts = (params: ProductListConfig) => {
  return fetHandler.get<SuccessResponse<ProductList>>("products", {
    params
  });
};
export const getProductDetail = (id: string) => {
  return fetHandler.get<SuccessResponse<Product>>(`products/${id}`);
};
