import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import ImageIcon from "@material-ui/icons/Image";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    tag: "",
    quantity: 0,
  });
  const classes = useStyles();
  const owner = useSelector((state) => state.userReducer).userId;
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  console.log(img);

  return (
    <Container className={classes.addProductForm}>
      <Typography gutterBottom variant="h5">
        Add new Product :
      </Typography>
      {Object.keys(product).map((el, i) => (
        <TextField
          className={classes.textField}
          key={i}
          value={product[el]}
          label={el}
          onChange={(e) => handleChange(e)}
          name={el}
        />
      ))}

      <Button component="label" className={classes.imgIcon} variant="contained">
        <ImageIcon />
        <Typography>Add image(s)</Typography>
        <input
          type="file"
          hidden
          onChange={(e) => setImg(e.target.files[0])}
        />
      </Button>

      <Button variant="outlined" className={classes.btn}>
        Add new Product
      </Button>
    </Container>
  );
};

export default AddProduct;
