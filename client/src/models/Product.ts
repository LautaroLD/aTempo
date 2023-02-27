export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantityInStock: number;
  createdAt: Date;
  ProductImgs: any[];
  Size: Size[];
  Categories: Category[];
  Colours: Colour[];
  Brand: Brand;
  Last: Last[];
};

type Brand = {
  id: number;
  name: string;
  imgBrand: string;
};

type Category = {
  id: number;
  name: string;
};

type Colour = {
  id: number;
  colorName: string;
  colorValue: string;
};

type Last = {
  id: number;
  nameShoelast: string;
};

type Size = {
  id: number;
  sizeNumberAr: string;
};
