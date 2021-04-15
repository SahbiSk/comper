import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  pic: {
    marginTop: "10px",
    width: "90%",
  },
  img: {
    width: "100%",
  },
  productImg: {
    height: "100px",
  },
  cardContent: {
    color: "var(--color-blue-light)",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-around",
    borderTop: "1px solid rgba(0,0,0,0.2)",
  },

  icon: {
    height: "100%",
    width: "50%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  likeIcon: {
    color: "var(--color-blue-light)",
    borderRight: "1px solid rgba(0,0,0,0.2)",
  },
  dislikeIcon: {
    color: "var(--color-pink-dark)",
  },
  commentSection: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    padding: "20px ",
  },
  postButton: {
    background: "var(--color-blue-light)",
    width: "20%",
    color: "white",
    fontWeight: "800",
    "&:hover": {
      background: "var(--color-blue-dark)",
    },
  },
  commentField: {
    width: "70%",
  },
  comment: {
    margin: "10px 15px",
    padding: "5px 20px",
    background: "var(--color-grey-light)",
    borderRadius: "50px",
  },
  commentItem: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
  },
  commentActions: {
    width: "80%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  commentIcon: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    height: "100%",
    "&:hover": {
      color: "var(--color-blue-dark)",
    },
  },
  commentDislikeIcon: {
    color: "var(--color-pink-dark)",
    borderLeft: "1px solid rgba(0,0,0,0.2)",
  },
  commentLikeIcon: {
    color: "var(--color-blue-light)",
  },
}));
