import { User } from "src/auth/models";

// Save value to localStorage
export const saveToLocalStorage = (key: string, value?: string | User) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get value form localStorage

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Remove value form localStorage
export const removeKeyLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const formattedCurrency = (n: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" });
  return formatter.format(n);
};
export const formatShopeeSalesCount = (salesCount: number) => {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  })
    .format(salesCount)
    .replace(".", ",")
    .toLocaleLowerCase();
};

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + "%";

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i,${id}`;
};

export const getIDFromNameId = (nameId: string) => {
  const arr = nameId.split("-i,");
  return arr[arr.length - 1];
};

export const localStorageEventarget = new EventTarget();
