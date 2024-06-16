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
