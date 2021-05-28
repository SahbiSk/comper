import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  nav: {
    display: " flex",
    width: "100vw",
    height: "10vh",
    justifyContent: "space-around",
    boxShadow: "1px 1px 3px var(--color-blue-light)",
    alignItems: "center",
  },
  title: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    marginLeft: "2vw",
    height: "100%",
    cursor: "pointer",
  },
  logo: {
    transform: "scale(2.5)",
    marginRight: "2vw",
    color: "orange",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: "28px",
  },

  searchBoxContainer: {
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
  },
  searchBox: {
    width: "20vw",
    borderRadius: "50px !important",
  },

  searchIcon: {
    cursor: "pointer",
    background: "var(--color-blue-light)",
    color: "white",
    transform: "translate(1vw,5px) scale(1.6) ",
    height: "3.1vh",
    borderRadius: "0 50px 50px 0",
    transition: "0.2s",
    width: "3vw",
    "&:hover": {
      background: "var(--color-blue-dark)",
    },
  },
  icon: {
    background: "var(--color-blue-light)",
    padding: "8px 20px",
    borderRadius: "50px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
    "&:hover": {
      background: "var(--color-blue-dark)",
    },
  },
  logout: {
    background: "var(--color-blue-light)",
    color: "white",
    borderRadius: "50%",
    transform: "scale(2)",
    cursor: "pointer",
  },
}));
