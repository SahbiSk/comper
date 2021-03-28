import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  list: {
    padding: "0",
    color: "var(--color-blue-light)",
    borderRight: " 1px solid var(--color-blue-light)",
    width: "15vw",
  },
  slideIcon: {
    zIndex: "99",
    position: "fixed",
    top: "90vh",
    left: "6vw",
    background: "var(--color-blue-light)",
    color: "white",
    cursor: "pointer",
    borderRadius: "50%",
    transition: "0.2s",
    "&:hover": {
      boxShadow: " 1px 1px 4px var(--color-blue-light)",
    },
  },

  listItem: {
    display: "flex",
    alignItems: "center",
  },
  itemIcon: {
    fontSize: "26px",
    color: "var(--color-blue-light)",
  },
  itemText: { fontWeight: "600" },
}));
