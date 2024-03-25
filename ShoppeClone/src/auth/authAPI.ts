import fetHandler from "src/config/configAxios";
import { AuthResponse, IRegisOrLogin } from "./models";

export const RegisterAccount = (body: IRegisOrLogin) => {
  return fetHandler.post<AuthResponse>("/register", body);
};
export const LoginAccount = (body: IRegisOrLogin) => {
  return fetHandler.post<AuthResponse>("/login", body);
};
export const LogoutAccount = () => {
  return fetHandler.post("/logout");
};
