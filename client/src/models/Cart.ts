import { ProductsInCart } from "./ProductsInCart";

export type CartModel = {
  id: number | string;
  totalPrice: string;
  UserId: number | string;
  Products: CartProducts[];
};

export type CartProducts = {
  id: string;
  name: string;
  price: number;
  ProductsInCart: ProductsInCart;
  Brand: CartProductBrand;
  ProductImgs: CartProductImg[];
};

type CartProductBrand = {
  name: string;
};

type CartProductImg = {
  imgUrl: string;
};
