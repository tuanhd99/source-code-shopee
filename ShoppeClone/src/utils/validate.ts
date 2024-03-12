import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";

type Rules = {
  [key: string]: RegisterOptions;
};

export const validateLoginOrRegister = (getValuesInput: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Email address can not blank."
    },
    pattern: {
      value:
        // eslint-disable-next-line no-useless-escape
        /^([A-Za-z0-9]([\.]?[A-Za-z0-9_\-])*)\@[a-zA-Z0-9][_\-a-zA-Z0-9]{4,159}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]*)+$/,
      message: "Please key in a valid email address."
    }
  },
  password: {
    required: {
      value: true,
      message: "Password can not blank."
    },
    pattern: {
      value: /^[a-zA-Z0-9!@#$%^&*]{6,160}$/,
      message: "Please key in a valid password"
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: " Confirm Password can not blank."
    },
    pattern: {
      value: /^[a-zA-Z0-9!@#$%^&*]{6,160}$/,
      message: "Please key in a valid confirm password"
    },
    validate:
      typeof getValuesInput === "function"
        ? (value) => value === getValuesInput("password") || "Confirm Email does not match."
        : undefined
  }
});

export const schema = yup.object({
  email: yup
    .string()
    .required("Password can not blank.")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^([A-Za-z0-9]([\.]?[A-Za-z0-9_\-])*)\@[a-zA-Z0-9][_\-a-zA-Z0-9]{4,159}(\.[a-zA-Z0-9][_\-a-zA-Z0-9]*)+$/,
      "Please key in a valid email address."
    ),
  password: yup
    .string()
    .required("Password can not blank.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Please key in a valid confirm password"),
  confirm_password: yup
    .string()
    .required("Password can not blank.")
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,160}$/, "Please key in a valid confirm password")
    .oneOf([yup.ref("password")], "Confirm Email does not match.")
});

const schemaLogin = schema.omit(["confirm_password"]);
export type SchemaLogin = yup.InferType<typeof schemaLogin>;

export type Schema = yup.InferType<typeof schema>;
