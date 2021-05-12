import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Icon,
  TextField,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import React from "react";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Product = (props) => {
  const server = "http://localhost:5000/";

  const classes = useStyles();
  const id = props.match.params.id;
  const product = useSelector((state) => state.productReducer).filter(
    (el) => el._id === id
  )[0];

  const comments = [
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
    {
      like: 10,
      dislike: 5,
      content: "hello world",
    },
  ];

  return (
    <Grid className={classes.container} container>
      <Grid item className={classes.pic} xs={12} sm={6}>
        <img
          src={server + product.images[0]}
          className={classes.img}
          alt="img"
        />
        <Card className={classes.productImg}>
          <CardContent className={classes.cardContent}>
            #{product.category}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Icon className={`${classes.likeIcon} ${classes.icon} `}>
              {product.dislike.length}
              <ThumbUpAltIcon />
            </Icon>
            <Icon className={`${classes.dislikeIcon} ${classes.icon} `}>
              {product.like.length}
              <ThumbDownIcon />
            </Icon>
          </CardActions>
        </Card>
      </Grid>
      <Grid item className={classes.comments} xs={12} sm={6}>
        <Container className={classes.commentSection}>
          <TextField
            className={classes.commentField}
            placeholder="Enter comment here..."
          />
          <Button variant="contained" className={classes.postButton}>
            Post
          </Button>
        </Container>

        {comments.map((com, key) => (
          <div className={classes.commentItem} key={key}>
            <div className={classes.comment} key={key}>
              {com.content}
            </div>
            <CardActions className={classes.commentActions}>
              <Icon
                className={`${classes.commentLikeIcon} ${classes.commentIcon} `}
              >
                {com.like}
                <ThumbUpAltIcon />
              </Icon>
              <Icon
                className={`${classes.commentDislikeIcon} ${classes.commentIcon} `}
              >
                {com.dislike}
                <ThumbDownIcon />
              </Icon>
            </CardActions>
          </div>
        ))}
      </Grid>
    </Grid>
  );
};

export default Product;
