import { GET_PRODUCTS, ADD_PRODCUT, LIKE, DISLIKE } from "../types";
import Api from "../utils/Api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getProducts = (token) => async (dispatch) => {
  //options.headers.Authorization = `Bearer ${token}`;

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

export const like = (id, user) => async (dispatch) => {
  options.headers.Authorization = "Bearer " + user.token;
  console.log(options.headers);
  // console.log(token);
  try {
    const res = await Api.post(`/products/${id}/likes`, user, options);
    console.log(res.data.product);
    dispatch({
      type: LIKE,
      payload: res.data.product,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const dislike = (id, user) => async (dispatch) => {
  console.log(id);
  try {
    const res = await Api.post(`/products/${id}/dislikes`, user, options);
    console.log(res.data.product);
    dispatch({
      type: DISLIKE,
      payload: res.data.product,
    });
  } catch (error) {
    console.log(error.response.data);
  }
};
