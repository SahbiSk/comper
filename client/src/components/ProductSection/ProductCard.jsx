import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import {
  AiFillLike,
  AiFillDislike,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { withRouter } from "react-router";

const ProductCard = ({ el, history }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => history.push("/product/" + el.id)}
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
  );
};

export default withRouter(ProductCard);
