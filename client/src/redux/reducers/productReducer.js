import { GET_PRODUCTS } from "../types";

const INITIAL_STATE = [];

const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return payload;

    default:
      return state;
  }
};
export default productsReducer;
