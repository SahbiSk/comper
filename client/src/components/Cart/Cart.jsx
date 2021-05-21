import React from "react";
import useStyles from "./styles";
import { useCookies } from "react-cookie";
import { Container } from "@material-ui/core";
import Api from "../../redux/utils/Api";

const Cart = () => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies();

  let prodID;

  const deleteFromDelete = async () => {
    const res = await Api.delete(`/deleteOne/${prodID}`);
    console.log(res);
  };

  return <Container></Container>;
};

export default Cart;
