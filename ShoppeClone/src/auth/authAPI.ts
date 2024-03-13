import fetHandler from "src/config/configAxios";
import { AuthResponse, IRegisOrLogin } from "./models";

export const RegisterAccount = (body: IRegisOrLogin) => {
  return fetHandler.post<AuthResponse>("/register", body);
};
