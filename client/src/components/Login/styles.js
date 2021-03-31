import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    border: "1px solid var(--color-grey-light)",
    boxShadow: "1px 1px 5px rgba(0,0,0,0.2)",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  field: {
    margin: "0 10px",
  },
  formTitle: {
    fontSize: "45px",
    color: "var(--color-blue-light)",
  },
  button: {
    fontWeight: "600",
    color: "var(--color-blue-light)",
    border: "1px solid ",
    "&:hover": {
      color: "white",
      background: "var(--color-blue-light)",
    },
  },
  switcher: {
    fontWeight: "600",
    background: "white",
    color: "var(--color-blue-light)",
    "&:hover": {
      color: "white",
      background: "var(--color-blue-light)",
    },
  },
  bg: { color: "white", background: "var(--color-blue-light)" },
  upload: {
    background: "red",
    width: "20px",
  },
}));
