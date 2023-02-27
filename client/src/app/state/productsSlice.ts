import { Product } from "../../models/Product";
import { createSlice } from "@reduxjs/toolkit";
import { deleteRequest, getRequest } from "../../services/httpRequest";

export const initialList: Array<Product> = [];
export const initialDetail = {} as Product;

export const productSlice = createSlice({
  name: "products",
  initialState: {
    list: initialList,
    detail: initialDetail
  },
  reducers: {
    setProductsList: (state, action) => {
      state.list = action.payload;
    },
    setDetailProduct: (state, action) => {
      state.detail = action.payload;
    },
    setDeleteProduct: (state, action) => {
      state.list = state.list.filter(produc => produc.id !== action.payload);
    },

    setUpdateProduct: (state, action) => {
      const { price, name, description, quantityInStock, idProduct } = action.payload;
      const productUpdate = state.list.find(produc => produc.id === idProduct);
      if (productUpdate) {
        productUpdate.price = price;
        productUpdate.name = name;
        productUpdate.description = description;
        productUpdate.quantityInStock = quantityInStock;
      } else {
        console.log("error");
      }
    }
  }
});

export const { setProductsList, setDeleteProduct, setUpdateProduct, setDetailProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const getAllProducts = () => async (dispatch: any) => {
  try {
    const { products } = await getRequest("/products/?items=15");
    dispatch(setProductsList(products));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsById = (id: number) => async (dispatch: any) => {
  try {
    const { product } = await getRequest(`/products/${id}`);
    dispatch(setDetailProduct(product));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductsById = (id: number) => async (dispatch: any) => {
  try {
    const deletedProduct = await deleteRequest("/products/delete/", id); //as {success:string};
    if (deletedProduct.success) dispatch(setDeleteProduct(id));
  } catch (error) {
    console.log(error);
  }
};
