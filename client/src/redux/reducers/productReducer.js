import { ADD_PRODCUT, GET_PRODUCTS } from "../types";

const INITIAL_STATE = [];

const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return payload;
    case ADD_PRODCUT:
      return [...state, payload];

    default:
      return state;
  }
};
export default productsReducer;
