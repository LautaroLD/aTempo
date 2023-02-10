import { configureStore } from "@reduxjs/toolkit";
import { Product } from "./../models/Products";
import products from "./state/productsSlice";

export interface AppStore {
  products: {
    list: Array<Product>;
    detail: Product;
  };
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    products
  }
});
