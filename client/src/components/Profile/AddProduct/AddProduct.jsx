import { Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import ImageIcon from "@material-ui/icons/Image";
import { addProduct } from "../../../redux/actions/productAction";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: null,
    tag: "",
    quantity: null,
  });
  const classes = useStyles();
  const owner = useSelector((state) => state.userReducer).userId;
  const [file1, setfile1] = useState(null);
  const [file2, setfile2] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { owner, ...product, file1, file2 };
    data.price = parseFloat(data.price);
    data.quantity = parseInt(data.quantity);
    if (data.img === "") {
      setErrorMsg("Please include an image");
    }
    dispatch(addProduct(data));
  };

  useEffect(() => {
    setTimeout(() => setErrorMsg(null), 2500);
  }, [errorMsg]);

  return (
    <Container
      component="form"
      className={classes.addProductForm}
      onSubmit={(e) => handleSubmit(e)}
    >
      {errorMsg && <div className={classes.notif}>{errorMsg}</div>}
      <Typography gutterBottom variant="h5">
        Add new Product :
      </Typography>
      {Object.keys(product).map((el, i) => (
        <TextField
          className={classes.textField}
          key={i}
          required
          value={product[el]}
          label={el}
          onChange={(e) => handleChange(e)}
          name={el}
        />
      ))}
      <Button component="label" className={classes.imgIcon} variant="contained">
        <ImageIcon />
        <Typography>Add image1</Typography>
        <input
          type="file"
          hidden
          name="image"
          onChange={(e) => setfile1(e.target.files[0])}
        />
      </Button>{" "}
      <Button component="label" className={classes.imgIcon} variant="contained">
        <ImageIcon />
        <Typography>Add image2</Typography>
        <input
          type="file"
          hidden
          name="image"
          onChange={(e) => setfile2(e.target.files[0])}
        />
      </Button>
      <Button variant="outlined" className={classes.btn} type="submit">
        Add new Product
      </Button>
    </Container>
  );
};

export default AddProduct;
