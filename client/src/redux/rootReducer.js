import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";

const rootReducer = combineReducers({
  userReducer,
  productReducer,
});

export default rootReducer;
