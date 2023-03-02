import { CartModel, CartProducts } from "./../../models/Cart";
import { ProductInCart } from "./../../models/ProductInCart";
import { LoginValues } from "../../models/LoginValues";
import { getRequest, postRequest, putRequest } from "../../services/httpRequest";
import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { InitialAuth } from "../../models/InitialAuth";
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage
} from "../../utils/LocalStorageFunctions";
import { SignUpValues } from "../../models/SignUpValues";
import { UserDirection, UserInformationForm } from "../../models/User";
import { ChangePasswords } from "../../models/Password";
import { RemoveProductCart } from "../../models/RemoveProductCart";

export const initialAuth: InitialAuth = {
  token: "",
  user: {
    email: "",
    lastName: "",
    name: "",
    id: "",
    CartId: "",
    documentId: undefined,
    birthdate: undefined,
    isAdmin: false,
    Addresses: {
      id: "",
      country: "",
      state: "",
      city: "",
      street: "",
      number: 0,
      zipCode: 0
    },
    Cart: {
      id: "",
      totalPrice: "",
      UserId: "",
      Products: []
    }
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getLocalStorage("auth") ? getLocalStorage("auth") : initialAuth,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.user.Addresses.length !== 0) {
        state.user.Addresses = {
          id: action.payload.user.Addresses[0].id,
          country: action.payload.user.Addresses[0].country,
          state: action.payload.user.Addresses[0].state,
          city: action.payload.user.Addresses[0].city,
          street: action.payload.user.Addresses[0].street,
          number: action.payload.user.Addresses[0].number,
          zipCode: action.payload.user.Addresses[0].zipCode
        };
      }
    },
    setLogout: () => {
      clearLocalStorage("auth");
      return initialAuth;
    },
    setUserInformation: (state, action) => {
      state.user = {
        ...state.user,
        name: action.payload.name,
        lastName: action.payload.lastName,
        documentId: action.payload.documentId,
        birthdate: action.payload.birthdate,
        createdAt: state.user.createdAt,
        updatedAt: state.user.updatedAt,
        deletedAt: state.user.deletedAt,
        isAdmin: state.user.isAdmin,
        id: state.user.id
      };
    },
    setUserDirection: (state, action) => {
      state.user.Addresses = {
        ...state.user.Addresses,
        id: action.payload.id,
        country: action.payload.country,
        state: action.payload.state,
        city: action.payload.city,
        street: action.payload.street,
        number: action.payload.number,
        zipCode: action.payload.zipCode
      };
    },
    setCart: (state, action) => {
      state.user.Cart.Products = {
        id: action.payload.id,
        totalPrice: action.payload.totalPrice,
        UserId: action.payload.UserId,
        Products: action.payload.Products
      };
    },
    setProdToCart: (state, action) => {
      state.user.Cart = {
        Products: [...state.user.Cart.Products, action.payload.Products]
      };
    },
    setCartProducts: (state, action) => {
      state.user.cart.Products = action.payload.Products;
    }
  }
});

export const {
  setLogin,
  setLogout,
  setUserInformation,
  setUserDirection,
  setCart,
  setProdToCart,
  setCartProducts
} = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (dataLogin: LoginValues) => async (dispatch: Dispatch) => {
  try {
    const auth = (await postRequest(dataLogin, "/users/login")) as InitialAuth;
    if (auth.token !== "") {
      dispatch(setLogin(auth));
      const authInStorage = { token: auth.token, user: auth.user };
      setLocalStorage("auth", authInStorage);
      return { login: true, msg: "Usuario logeado con éxito!" };
    }
    return false;
  } catch (error) {
    const msgError = error as string;
    return { login: false, msg: msgError.toString() };
  }
};

export const removeProductOfCart =
  (removeData: RemoveProductCart) => async (dispatch: Dispatch) => {
    try {
      const request = await postRequest(
        removeData,
        `/cart/remove?idProduct=${removeData.idProduct}&idCart=${removeData.idCart}&quantity=${removeData.quantity}`
      );
      return request;
    } catch (error) {
      const msgError = error as string;
      return { login: false, msg: msgError.toString() };
    }
  };

export const signUpUser = (dataSignUp: SignUpValues) => async () => {
  try {
    await postRequest(dataSignUp, "/users");
    return true;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};

export const updateUserInformation =
  (UserInformation: UserInformationForm) => async (dispatch: Dispatch) => {
    try {
      const update = await putRequest("/users/", UserInformation.id, UserInformation);
      console.log(update);
      console.log(UserInformation);
      
      
      if (update) {
        dispatch(setUserInformation(update.params));
        const localStorageAuth = getLocalStorage("auth");
        const auth = {
          ...localStorageAuth,
          user: {
            ...localStorageAuth.user,
            name: update.params.name,
            lastName: update.params.lastName,
            documentId: update.params.documentId,
            birthdate: update.params.birthdate
          }
        };
        setLocalStorage("auth", auth);
        return "Perfil actualizado con éxito";
      }
      return false;
    } catch (error) {
      const msgError = error as string;
      return msgError.toString();
    }
  };

export const postUserDirection = (dataDirection: UserDirection) => async (dispatch: Dispatch) => {
  try {
    const newDirection = await postRequest(dataDirection, `/users/${dataDirection.userId}/address`);
    dispatch(setUserDirection(newDirection.address));
    const localStorageAuth = getLocalStorage("auth");
    const auth = {
      ...localStorageAuth,
      user: {
        ...localStorageAuth.user,
        id: newDirection.params.id,
        country: newDirection.params.country,
        state: newDirection.params.state,
        city: newDirection.params.city,
        street: newDirection.params.street,
        number: newDirection.params.number,
        zipCode: newDirection.params.zipCode
      }
    };
    setLocalStorage("auth", auth);
    return true;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};

export const updateUserDirection = (dataDirection: UserDirection) => async (dispatch: Dispatch) => {
  try {
    const updateDirection = await putRequest(
      `/users/${dataDirection.userId}/address/`,
      dataDirection.id,
      dataDirection
    );
    dispatch(setUserDirection(updateDirection.address));
    const localStorageAuth = getLocalStorage("auth");
    const auth = {
      token: localStorageAuth.token,
      user: {
        ...localStorageAuth.user,
        Addresses: {
          id: updateDirection.address.id,
          country: updateDirection.address.country,
          state: updateDirection.address.state,
          city: updateDirection.address.city,
          street: updateDirection.address.street,
          number: updateDirection.address.number,
          zipCode: updateDirection.address.zipCode
        }
      }
    };
    setLocalStorage("auth", auth);
    return true;
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};

export const updateUserPassword = (dataUser: ChangePasswords) => async () => {
  try {
    const request = await putRequest(`/users/`, `${dataUser.id}/password`, dataUser);
    return "Cambio de contraseña exitoso";
  } catch (error) {
    const msgError = error as string;
    return msgError.toString();
  }
};

export const getCart = (idCart: string | number) => async (dispatch: Dispatch) => {
  try {
    const cart = await getRequest(`/cart?idCart=${idCart}`);
    if (cart.length !== 0) {
      dispatch(setCart(cart));
    }
    const localStorageAuth = getLocalStorage("auth");
    localStorageAuth.user.Cart = cart;
    setLocalStorage("auth", localStorageAuth);
    return cart;
  } catch (error) {
    const msgError = error as string;
    return { login: false, msg: msgError.toString() };
  }
};

export const addToCart = (prodCart: ProductInCart) => async (dispatch: Dispatch) => {
  try {
    const cartProd = await postRequest(prodCart, `/cart/add`);

    return cartProd.productAdded;
  } catch (error) {
    const msgError = error as string;
    return { login: false, msg: msgError.toString() };
  }
};
