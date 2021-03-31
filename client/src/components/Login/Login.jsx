import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";

const Login = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (data.email.match(validation)) {
      console.log("valid  email");
    }
  };

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
            <FileBase64
              className={classes.upload}
              onDone={(el) => console.log(el)}
              multiple={false}
              required
            />
          </IconButton>
        )}
        <Button size="large" type="submit" className={classes.button}>
          {login ? "Login" : "Signup"}
        </Button>
      </Container>
    </>
  );
};

export default Login;
