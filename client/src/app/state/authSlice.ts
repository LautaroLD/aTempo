import { LoginValues } from "../../models/LoginValues";
import { postRequest } from "../../services/httpRequest";
import { User } from "../../models/User";
import { createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpRequest";

type InitialAuth = {
  user: User;
  token: string;
};

export const initialAuth: InitialAuth = {
  token: "",
  user: {
    email: "",
    lastName: "",
    name: "",
    password: "",
    documentId: 0,
    birthdate: undefined,
    isAdmin: 0,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  }
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (dataLogin: LoginValues) => async (dispatch: any) => {
  try {
    const user = await postRequest(dataLogin, "/users/login");
    dispatch(setLogin(user));
  } catch (error) {
    console.log(error);
  }
};
