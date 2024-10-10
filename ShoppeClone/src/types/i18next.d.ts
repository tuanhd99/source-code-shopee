import { resources } from "../i18n/i18n";
import "i18next";
declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    resources: (typeof resources)["vi"];
    // other
  }
}
