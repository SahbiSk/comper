import { LOGIN, SIGN_UP } from "../types";
import Api from "../utils/Api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const signUp =
  ({ username, email, password, avatar }) =>
  async (dispatch) => {
    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", avatar);
    try {
      const res = await Api.post("/users/signUp", data, options);
      dispatch({ type: SIGN_UP, payload: res.data });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

export const signIn = (data) => async (dispatch) => {
  try {
    const res = await Api.post("/users/signIn", data, options);
    dispatch({ type: LOGIN, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
