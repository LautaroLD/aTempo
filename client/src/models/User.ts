export type User = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  isAdmin?: boolean;
  documentId?: number;
  birthdate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
