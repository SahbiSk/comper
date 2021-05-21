import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signUp } from "../../redux/actions/userActions";

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.userReducer);


  const handleSubmit = (e) => {
    e.preventDefault();
    login ? dispatch(signIn(data)) : dispatch(signUp({ ...data, avatar }));
  };
  if (user.email) {
    props.history.push("/");
  }

  return (
    <>
      <Container
        component="form"
        maxWidth="xs"
        className={classes.container}
        onSubmit={handleSubmit}
      >
        <Container className={classes.buttonContainer}>
          <Button
            className={`${classes.switcher} ${login ? classes.bg : ""} `}
            variant={`${login ? "contained" : "outlined"}`}
            onClick={() => setLogin(true)}
          >
            Login
          </Button>
          <Button
            variant={`${login ? "outlined" : "contained"}`}
            className={`${classes.switcher} ${login ? "" : classes.bg} `}
            onClick={() => setLogin(false)}
          >
            SignUp
          </Button>
        </Container>

        <Typography
          variant="h3"
          align="center"
          gutterBottom
          className={classes.formTitle}
        >
          {login ? "Welcome Back!" : "Join Us!"}
        </Typography>
        {Object.keys(data).map((el) => (
          <TextField
            type={el}
            key={el}
            value={data[el]}
            placeholder={`Enter your ${el} `}
            label={el}
            required
            variant="outlined"
            className={classes.field}
            onChange={(e) => setData({ ...data, [el]: e.target.value })}
          />
        ))}
        {!login && (
          <IconButton>
            <input
              className={classes.upload}
              type="file"
              value={data.avatar}
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
          </IconButton>
        )}
        <Button size="large" type="submit" className={classes.button}>
          {login ? "Login" : "Signup"}
        </Button>
      </Container>
      {/* <img src={"http://localhost:5000/" + user.avatar} /> */}
    </>
  );
};

export default Login;
