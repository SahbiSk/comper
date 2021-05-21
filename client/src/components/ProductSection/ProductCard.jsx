import React from "react";
import {
  Card,
  CardActions,
  CardContent,
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
  const server = "http://localhost:5000/";
  const starGenerator = () => {
    let t = [];
    for (let i = 1; i < 6; i++) {
      t.push(
        i <= el.rating ? (
          <AiFillStar className={classes.star} key={i} />
        ) : (
          <AiOutlineStar key={i} />
        )
      );
    }
    return t;
  };
  
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      onClick={() => history.push("/product/" + el._id)}
    >
      <Card className={classes.card}>
        <img
          src={server + el.images[0]}
          className={classes.cardMedia}
          alt={el.name}
        />
        <CardContent className={classes.content}>
          <div>
            <Typography variant="h5">{el.name} </Typography>
            <Typography color="textSecondary">{el.content} </Typography>
          </div>
          <div>{starGenerator()}</div>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.like}>
            <p>{el.like.length}</p>
            <AiFillLike className={classes.icon} />
          </div>
          <div className={classes.dislike}>
            <p>{el.dislike.length}</p>
            <AiFillDislike className={classes.icon} />
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default withRouter(ProductCard);
