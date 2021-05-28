import { ADD_PRODCUT, DISLIKE, GET_PRODUCTS, LIKE } from "../types";

const INITIAL_STATE = [];

const productsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return payload;
    case ADD_PRODCUT:
      return [...state, payload];
    case DISLIKE:
      return [...state.filter((pro) => pro._id !== payload._id), payload];

    case LIKE:
      return [...state.filter((pro) => pro._id !== payload._id), payload];

    default:
      return state;
  }
};
export default productsReducer;
