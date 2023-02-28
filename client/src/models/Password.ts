export type ChangePasswords = {
  id?: string | number;
  email?: string;
  password: string;
  newPassword: string;
  newPasswordConfirm?: string;
};
