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
  ProductsInCart: CartProductInformation;
  Brand: CartProductBrand;
  ProductImgs: CartProductImg[];
};

export type CartProductInformation = {
  id: string | number;
  name: string;
  quantity: number;
  size: string;
  last: string;
  color: string;
};

type CartProductBrand = {
  name: string;
};

type CartProductImg = {
  imgUrl: string;
};
