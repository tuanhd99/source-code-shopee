import fetHandler from "src/config/configAxios";
import { Category } from "src/types/category.type";
import { SuccessResponse } from "src/types/utils.type";

export const getCategory = () => {
  return fetHandler.get<SuccessResponse<Category[]>>("categories");
};
