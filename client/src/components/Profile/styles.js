import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  profileSectionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "1px 2px 5px rgba(0,0,0,0.2)",
  },
  userInfo: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "3vh",
    borderTop: "1px solid rgba(0,0,0,0.2)",
    
  },
  avatar: {
    height: "100%",
    width: "40%",
    borderRadius: "50%",
    marginBottom: "2vh",
  },
}));
