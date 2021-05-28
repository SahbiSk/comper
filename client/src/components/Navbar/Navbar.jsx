import React, { useState, useEffect } from "react";
import { GiCampfire } from "react-icons/gi";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../redux/actions/userActions";

const Navbar = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState();
  const list = useSelector((state) => state.productReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (value) {
      localStorage.setItem("tag", value.tag);
    }
  }, [value]);
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.title} onClick={() => props.history.push("/")}>
        <GiCampfire className={classes.logo} />
        <h1 className={classes.titleText}>Camper</h1>
      </div>

      <div className={classes.searchBoxContainer}>
        <Autocomplete
          options={list}
          getOptionLabel={(list) => list.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type item here..."
              className={classes.searchBox}
            />
          )}
          onChange={(e) =>
            setValue(list.filter((el) => e.target.innerHTML === el.name)[0])
          }
        />
        <SearchIcon
          className={classes.searchIcon}
          onClick={() =>
            value ? props.history.push(`/product/${value._id}`) : ""
          }
        />
      </div>
      {user.email && (
        <Link to="/users" className={classes.icon}>
          <GroupIcon />
        </Link>
      )}
      <Link to={`/${user.email ? "profile" : "auth"}`} className={classes.icon}>
        {`${user.email ? "Profile" : "Login"}`}
      </Link>
      {user.userId && (
        <ExitToAppIcon
          onClick={() => handleLogout()}
          className={classes.logout}
        />
      )}
    </nav>
  );
};

export default Navbar;
