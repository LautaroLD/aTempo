import { LoginValues } from "../../models/LoginValues";
import { postRequest } from "../../services/httpRequest";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { InitialAuth } from "../../models/InitialAuth";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage
} from "../../utils/LocalStorageFunctions";
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
    isAdmin: false,
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getLocalStorage("auth") ? getLocalStorage("auth") : initialAuth,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: () => {
      clearLocalStorage("auth");
      return initialAuth;
    }
  }
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (dataLogin: LoginValues) => async (dispatch: Dispatch) => {
  try {
    const auth = (await postRequest(dataLogin, "/users/login")) as InitialAuth;
    if (auth.token !== "") {
      dispatch(setLogin(auth));
      const authInStorage = { token: auth.token, user: auth.user };
      setLocalStorage("auth", authInStorage);
      return "succesfull";
    }
    return false;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
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
