import { GET_PRODUCTS, ADD_PRODCUT } from "../types";
import Api from "../utils/Api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getProducts = (token) => async (dispatch) => {
  // options.headers.Authorization = `Bearer ${token} `;

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
    dispatch({ type: ADD_PRODCUT, payload: res.data.doc });
  } catch (error) {
    console.log(error.message);
  }
};

export const like = (id, token) => async (dispatch) => {
  options.headers.Authorization = "Bearer" + token;
  console.log(options.headers);
  // console.log(token);
  try {
    const res = await Api.post(`/products/${id}/likes`, options);
    console.log(res);
  } catch (error) {}
};

export const dislike = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await Api.post(`/products/${id}/dislikes`);
    console.log(res);
  } catch (error) {}
};
