import React, { useState } from "react";
import { GiCampfire } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState("type item here...");

  return (
    <nav className={classes.nav}>
      <div className={classes.title}>
        <GiCampfire className={classes.logo} />
        <h1 className={classes.titleText}>Camper</h1>
      </div>

      <div className={classes.searchBoxContainer}>
        <input
          onFocus={() => setValue(value === "type item here..." ? "" : value)}
          onBlur={() => setValue(!value ? "type item here..." : value)}
          className={classes.searchBox}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AiOutlineSearch className={classes.searchIcon} />
      </div>

      <Link to="/auth" className={classes.icon}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
