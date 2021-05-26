import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  addProductForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    width: "100%",
    margin: "1vh",
  },
  btn: {
    color: "var(--color-blue-light)",
    fontWeight: "600",
    padding: "1vh",
    "&:hover": {
      color: "white",
      background: "var(--color-blue-light)",
    },
  },
  imgIcon: {
    background: "var(--color-pink-dark)",
    color: "white",
    margin: "2vh",
  },
}));
