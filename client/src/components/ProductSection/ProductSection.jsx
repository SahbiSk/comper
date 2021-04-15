import { Grid } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import "./styles.css";
import products from "./data";
import Categories from "../Categories/Categories";
import ProductCard from "./ProductCard";
import SuggestionsList from "./SuggestionList/SuggestionsList";

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
      <div>
        {localStorage.getItem("tag") && <SuggestionsList />}
        <Grid container className={classes.container} spacing={3}>
          {products.map((el, i) => (
            <ProductCard key={i} el={el} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductSection;
