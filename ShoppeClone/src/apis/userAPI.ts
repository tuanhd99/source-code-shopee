import { User } from "src/auth/models";
import fetHandler from "src/config/configAxios";
import { SuccessResponse } from "src/types/utils.type";

export interface BodyUpdateProfile extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
  password?: string;
  newPassword?: string;
}
export const getProfile = () => {
  return fetHandler.get<SuccessResponse<User>>("me");
};
export const updateProfile = (body: BodyUpdateProfile) => {
  return fetHandler.put<SuccessResponse<User>>("user", body);
};

export const uploadAvatar = (body: FormData) => {
  return fetHandler.post<SuccessResponse<string>>("user/upload-avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
