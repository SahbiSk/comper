import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import EmailIcon from "@material-ui/icons/Email";
import { Fragment } from "react";
import AddProduct from "./AddProduct/AddProduct";

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.userReducer);
  const server = "http://localhost:5000/";

  const { email, totalPnts, avatar, username } = user;
 
  return (
    <Fragment>
      <br />
      <Grid container spacing={3}>
        <Grid item sm={12} md={6} className={classes.profileSectionContainer}>
          <img src={server + avatar} alt="avatar" className={classes.avatar} />
          <Typography variant="h3" gutterBottom>
            {username}
          </Typography>
          <Container className={classes.userInfo}>
            <Typography color="textSecondary" gutterBottom>
              <EmailIcon /> : {email}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Total Points : {totalPnts}
            </Typography>
          </Container>
        </Grid>
        <Grid item sm={12} md={6}>
          <AddProduct />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Profile;
