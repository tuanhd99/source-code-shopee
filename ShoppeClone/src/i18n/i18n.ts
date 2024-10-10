import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Translate_En from "./locales/en.json";
import Translate_Vi from "./locales/vi.json";

export const resources = {
  en: {
    translate: Translate_En
  },
  vi: {
    translate: Translate_Vi
  }
} as const;
// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  lng: "vi",
  ns: ["translate"],
  fallbackLng: "vi",
  resources,
  interpolation: {
    escapeValue: false
  }
});
export default i18n;
