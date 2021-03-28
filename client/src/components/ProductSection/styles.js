import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
  },
  container: {
    width: "80vw",
    marginTop: "5vh",
    margin: "0 auto",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  card: {
    height: "42vh",
    cursor: "pointer",
  },
  content: {
    minHeight: "80px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid rgba(0,0,0,0.2)",
    paddingTop: "4vh",
    height: "35px",
  },
  like: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    cursor: "pointer",
    color: "var(--color-blue-light)",
    fontWeight: "800",
    fontSize: "18px",
    justifyContent: "center",
  },
  dislike: {
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "18px",
    alignItems: "center",
    display: "flex",
    width: "50%",
    cursor: "pointer",
    color: "var(--color-pink-dark)",
  },
  icon: {
    transform: "scale(1.3)",
    marginLeft: "10px",
    "&:hover": {
      animation: `animate 1000ms infinite`,
    },
  },
}));
