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
import {
  AiFillLike,
  AiFillDislike,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import "./styles.css";

import products from "./data";
import Categories from "../Categories/Categories";

const ProductSection = (props) => {
  const classes = useStyles();

  const starGenerator = (likes, dislike) => {
    let perc = (dislike * 100) / (likes + dislike);
    console.log(Math.floor(perc));
  };

  starGenerator(45, 10);
  return (
    <div className={classes.mainContainer}>
      <Categories />
      <Grid container className={classes.container} spacing={3}>
        {products.map((el, i) => (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            onClick={() => props.history.push("/product/" + el.id)}
          >
            <Card className={classes.card}>
              <CardMedia image={el.img} className={classes.cardMedia} />
              <CardContent className={classes.content}>
                <div>
                  <Typography variant="h5">{el.name} </Typography>
                  <Typography color="textSecondary">{el.content} </Typography>
                </div>
                <div>
                  <AiFillStar className={classes.star} />
                  <AiFillStar className={classes.star} />
                  <AiFillStar className={classes.star} />
                  <AiOutlineStar />
                  <AiOutlineStar />
                </div>
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
