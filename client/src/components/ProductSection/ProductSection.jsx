import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import "./styles.css";
//import data from "./data";
import Categories from "../Categories/Categories";
import ProductCard from "./ProductCard";
import SuggestionsList from "./SuggestionList/SuggestionsList";
import { getProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductSection = () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const data = useSelector((state) => state.productReducer);
  const [products, setProducts] = useState(data);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  //console.log(user.token);
  console.log("prod", products);

  useEffect(() => {
    dispatch(getProducts(user.token));
  }, [dispatch, user.token]);

  useEffect(() => {
    if (category) {
      setProducts(data.filter((el) => el.tag === category));
    } else {
      setProducts(data);
    }
  }, [category, data]);

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
