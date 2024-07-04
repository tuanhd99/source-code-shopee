import fetHandler from "src/config/configAxios";
import { IPurChases, PurchasesListStatus } from "src/types/purchase.type";
import { SuccessResponse } from "src/types/utils.type";

export const purChases = (body: { product_id: string; buy_count: number }) => {
  return fetHandler.post<SuccessResponse<IPurChases>>(`purchases/add-to-cart`, body);
};

export const getPurchases = (params: { status: PurchasesListStatus }) => {
  return fetHandler.get<SuccessResponse<IPurChases[]>>(`purchases`, {
    params
  });
};
