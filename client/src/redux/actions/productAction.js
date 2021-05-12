import { GET_PRODUCTS } from "../types";
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
