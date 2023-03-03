import { CartModel } from "./Cart";

export type User = {
  email: string;
  name: string;
  lastName: string;
  id: number | string;
  CartId: number | string;
  isAdmin?: boolean;
  documentId?: number;
  birthdate?: Date | string;
  Addresses?: UserDirection;
  Cart: CartModel;
};

export type UserDirection = {
  id?: number | string;
  userId?: number | string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  zipCode?: number;
};

export type UserInformationForm = {
  email: string;
  name: string;
  lastName: string;
  documentId?: number | string;
  birthdate?: Date | string;
  id?: string | number;
};
