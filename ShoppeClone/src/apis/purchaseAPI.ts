import fetHandler from "src/config/configAxios";
import { IBuyProduct, IPurChases, PurchasesListStatus } from "src/types/purchase.type";
import { SuccessResponse } from "src/types/utils.type";

export const addToCart = (body: { product_id: string; buy_count: number }) => {
  return fetHandler.post<SuccessResponse<IPurChases>>(`purchases/add-to-cart`, body);
};

export const getPurchases = (params: { status: PurchasesListStatus }) => {
  return fetHandler.get<SuccessResponse<IPurChases[]>>(`purchases`, {
    params
  });
};

export const buyProduct = (body: IBuyProduct[]) => {
  return fetHandler.post<SuccessResponse<IPurChases[]>>("purchases/buy-products", body);
};

export const updateProduct = (body: IBuyProduct) => {
  return fetHandler.put<SuccessResponse<IPurChases>>("purchases/update-purchase", body);
};

export const deleteProduct = (ids: string[]) => {
  return fetHandler.delete<SuccessResponse<{ deleted_count: number }>>("purchases", {
    data: ids
  });
};
