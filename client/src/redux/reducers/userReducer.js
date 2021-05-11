import { LOGIN, SIGN_UP, LOGOUT } from "../types";

const INITIAL_STATE = {
  email: "",
  username: "",
  password: "",
  avatar: "",
  wishlist: [],
  totalPnts: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_UP:
      return payload;
    case LOGIN:
      return payload;
    case LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
