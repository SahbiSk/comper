import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import "./styles.css";
import data from "./data";
import Categories from "../Categories/Categories";
import ProductCard from "./ProductCard";
import SuggestionsList from "./SuggestionList/SuggestionsList";

const ProductSection = () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState(data);

  useEffect(() => {
    if (category) {
      setProducts(data.filter((el) => el.tag === category));
    } else {
      setProducts(data);
    }
  }, [category]);

  console.log(category);

  return (
    <div className={classes.mainContainer}>
      <Categories category={category} setCategory={setCategory} />
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
