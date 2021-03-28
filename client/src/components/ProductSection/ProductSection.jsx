import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./styles.css";

import { products } from "./data";
import Categories from "../Categories/Categories";

const ProductSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Categories />
      <Grid container className={classes.container} spacing={3}>
        {products.map((el, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.card}>
              <CardMedia image={el.img} className={classes.cardMedia} />
              <CardContent className={classes.content}>
                <Typography variant="h5">{el.name} </Typography>
                <Typography color="textSecondary">{el.content} </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <div className={classes.like}>
                  <p>{el.like}</p>
                  <AiFillLike className={classes.icon} />
                </div>
                <div className={classes.dislike}>
                  <p>{el.dislike}</p>
                  <AiFillDislike className={classes.icon} />
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductSection;
