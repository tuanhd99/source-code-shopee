type Role = "User" | "Admin";
export interface User {
  _id: string;
  roles: Role[];
  email: string;
  name?: string;
  date_of_birth?: string;
  avatar?: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}
export interface IRegisOrLogin {
  email: string;
  passsword?: string;
}

export interface ResponseApi<Data> {
  message: string;
  data?: Data;
}

export type AuthResponse = ResponseApi<{
  access_token: string;
  expires: number;
  refresh_token: string;
  expires_refresh_token: number;
  user: User;
}>;
