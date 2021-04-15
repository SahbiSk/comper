import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";
import data from "../data";
import ProductCard from "../ProductCard";

const SuggestionsList = () => {
  const classes = useStyles();
  const tag = localStorage.getItem("tag");
  const filteredList = data.filter((el) => el.tag === tag).slice(0, 4);

  return (
    <div className={classes.recommandedSection}>
      <Typography
        variant="h4"
        gutterBottom
        className={classes.title}
        color="textSecondary"
      >
        Recommanded :
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {filteredList.map((el, key) => (
          <ProductCard el={el} key={key} />
        ))}
      </Grid>
    </div>
  );
};

export default SuggestionsList;
