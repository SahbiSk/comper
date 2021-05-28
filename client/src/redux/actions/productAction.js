import { GET_PRODUCTS, ADD_PRODCUT } from "../types";
import Api from "../utils/Api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getProducts = () => async (dispatch) => {
  try {
    const res = await Api.get("/products", options);
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = (data) => async (dispatch) => {
  try {
    console.log(data);
    const formData = new FormData();
    console.log(data.imgs);
    Object.keys(data).forEach((el) => {
      formData.append(el, data[el]);
    });
    const res = await Api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data.doc);
   // dispatch({ type: ADD_PRODCUT, payload: res.data.docs });
  } catch (error) {
    console.log(error.message);
  }
};
