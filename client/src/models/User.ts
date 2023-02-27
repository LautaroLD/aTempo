export type User = {
  email: string;
  name: string;
  lastName: string;
  id: number | string;
  isAdmin?: boolean;
  documentId?: number;
  birthdate?: Date | string;
  addresses?: UserDirection;
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
