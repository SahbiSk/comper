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
  notif: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    background: "red",
    color: "white",
    display: "flex",
    justifyContent: "center",
    height: "5vh",
    alignItems: "center",
    fontSize: "20px",
    zIndex: "100",
  },
}));
