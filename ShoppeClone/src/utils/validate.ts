import type { RegisterOptions } from "react-hook-form";
type Rules = {
  [key: string]: RegisterOptions;
};

export const validateLoginOrRegister: Rules = {
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
    }
  }
};
