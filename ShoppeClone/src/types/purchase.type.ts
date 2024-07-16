import { Product } from "./product.type";

export type PurchasesStatus = -1 | 1 | 2 | 3 | 4 | 5;
export type PurchasesListStatus = PurchasesStatus | 0;

export interface IPurChases {
  _id: string;
  buy_count: string;
  price: string;
  price_before_discount: string;
  status: number;
  user: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface IBuyProduct {
  product_id: string;
  buy_count: number;
}
