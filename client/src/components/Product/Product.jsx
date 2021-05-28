import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Icon,
  TextField,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../redux/utils/Api";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { dislike, getProducts, like } from "../../redux/actions/productAction";

const Product = (props) => {
  const server = "http://localhost:5000/";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  // console.log(user)

  const [addedToCart, setAddedToCart] = useState(false);
  const classes = useStyles();
  const id = props.match.params.id;
  const product = useSelector((state) => state.productReducer).filter(
    (el) => el._id === id
  )[0];

  const [index, setIndex] = useState(0);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const handleLikeOrDislike = (type) => {
    if (user.email !== "") {
      type === "like"
        ? dispatch(like(product._id, user))
        : dispatch(dislike(product._id, user));
      dispatch(getProducts(user.token));
    } else {
      props.history.push("/auth");
    }
  };
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
  const addToCard = async () => {
    try {
      const res = await Api.post(`/cart/addToCArt/${id}`, options);
      console.log(res);
      dispatch(getProducts());
      setAddedToCart(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setTimeout(() => setAddedToCart(false), 2500);
  }, [addedToCart]);

  return (
    <Grid className={classes.container} container>
      {addedToCart && <div className={classes.notif}>Added to Cart !</div>}
      <Grid item className={classes.pic} xs={12} sm={6}>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Typography>price : {product.price} </Typography>
          <Typography>Quantity in stock : {product.quantity} </Typography>
          {!!product.quantity && (
            <ButtonGroup>
              <Button onClick={() => addToCard()}>Add to cart</Button>
            </ButtonGroup>
          )}
        </CardActions>
        <img
          src={server + product.images[index]}
          className={classes.img}
          alt="img"
        />

        <ChevronLeftIcon
          className={classes.left}
          onClick={() => setIndex(index === 0 ? 1 : 0)}
        />
        <ChevronRightIcon
          className={classes.right}
          onClick={() => setIndex(index === 0 ? 1 : 0)}
        />
        <Card className={classes.productImg}>
          <CardContent className={classes.cardContent}>
            #{product.category}
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Icon
              className={`${classes.likeIcon} ${classes.icon} `}
              onClick={() => handleLikeOrDislike("like")}
            >
              {product.like.length}
              <ThumbUpAltIcon />
            </Icon>
            <Icon
              className={`${classes.dislikeIcon} ${classes.icon} `}
              onClick={() => handleLikeOrDislike("dislike")}
            >
              {product.dislike.length}
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
