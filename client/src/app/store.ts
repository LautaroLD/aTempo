import { configureStore } from "@reduxjs/toolkit";
import { User } from "../models/User";
import { Product } from "./../models/Products";
import products from "./state/productsSlice";
import auth from "./state/authSlice";

export interface AppStore {
  products: {
    list: Array<Product>;
    detail: Product;
  };
  auth: { user: User; token: string };
}

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth,
    products
  }
});
