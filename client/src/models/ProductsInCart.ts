export type ProductsInCart = {
  ProductId: number;
  CartId?: number;
  quantity: number;
  color: string;
  size: string;
  last: string;
  status?: string;
};
