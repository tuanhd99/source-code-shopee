/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from "axios";
import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";
import { HttpStatusCode } from "./constants";

type Rules = {
  [key: string]: RegisterOptions;
};

export const validateLoginOrRegister = (getValuesInput: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Địa chỉ email không được để trống."
    },
    pattern: {
      value:
        // eslint-disable-next-line no-useless-escape
        /^([A-Za-z0-9]([\.]?[A-Za-z0-9_\-])*)\@[a-zA-Z0-9][_\-a-zA-Z0-9]{4,159}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]*)+$/,
      message: "Vui lòng nhập địa chỉ email hợp lệ."
    }
  },
  password: {
    required: {
      value: true,
      message: "Mật khẩu không được để trống."
    },
    pattern: {
      value: /^[a-zA-Z0-9!@#$%^&*]{6,160}$/,
      message: "Vui lòng nhập mật khẩu hợp lệ."
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: "Xác nhận mật khẩu không được để trống."
    },
    pattern: {
      value: /^[a-zA-Z0-9!@#$%^&*]{6,160}$/,
      message: "Vui lòng nhập mật khẩu hợp lệ."
    },
    validate:
      typeof getValuesInput === "function"
        ? (value) => value === getValuesInput("password") || "Xác nhận Email không khớp."
        : undefined
  }
});

export const schema = yup.object({
  email: yup
    .string()
    .required("Địa chỉ email không được để trống.")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^([A-Za-z0-9]([\.]?[A-Za-z0-9_\-])*)\@[a-zA-Z0-9][_\-a-zA-Z0-9]{4,159}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]*)+$/,
      "Vui lòng nhập địa chỉ email hợp lệ."
    ),
  password: yup
    .string()
    .required("Mật khẩu không được để trống.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Vui lòng nhập mật khẩu hợp lệ."),
  confirm_password: yup
    .string()
    .required("Xác nhận mật khẩu không được để trống.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Vui lòng nhập mật khẩu hợp lệ.")
    .oneOf([yup.ref("password")], "Xác nhận Email không khớp."),
  name: yup.string().trim().required("Tên sản phẩm không được để trống.")
});

export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 kí tự"),
  phone: yup.string().max(20, "Độ dài tới đa là 20 kí tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 kí tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 kí tự"),
  date_of_birth: yup.date().max(new Date(), "Vui lòng chọn 1 ngày trong quá khứ"),
  password: schema.fields["password"],
  new_password: schema.fields["password"],
  confirm_password: schema.fields["confirm_password"]
});
export type UserSchema = yup.InferType<typeof userSchema>;
export const schemaUserProfile = userSchema.omit(["new_password", "password", "confirm_password"]);
export type SchemaUserProfile = yup.InferType<typeof schemaUserProfile>;

export const schemaLogin = schema.omit(["confirm_password", "name"]);
export type SchemaLogin = yup.InferType<typeof schemaLogin>;

export const schemaSearchName = schema.pick(["name"]);
export type SchemaSearchName = yup.InferType<typeof schemaSearchName>;

export type Schema = yup.InferType<typeof schema>;

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntity = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};
