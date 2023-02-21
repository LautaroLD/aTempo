import { LoginValues } from "../../models/LoginValues";
import { postRequest } from "../../services/httpRequest";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { InitialAuth } from "../../models/InitialAuth";
import { SignUpValues } from "../../models/SignUp";

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

export const loginUser = (dataLogin: LoginValues) => async (dispatch: Dispatch) => {
  try {
    const user = await postRequest(dataLogin, "/users/login");
    dispatch(setLogin(user));
  } catch (error) {
    console.log(error);
  }
};

export const signUpUser = (dataSignUp: SignUpValues) => async () => {
  try {
    await postRequest(dataSignUp, "/users");
    return "succesfull";
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};
