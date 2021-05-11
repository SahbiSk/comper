import {
  Slide,
  List,
  ListItem,
  ListItemText,
  Icon,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import React, { useState } from "react";
import data from "../ProductSection/data";

const Categories = ({ category, setCategory }) => {
  let categories = [...new Set(data.map((el) => el.tag))].map((el) => ({
    text: el,
  }));

  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <div>
      <Icon>
        <ChevronRightIcon
          style={{
            transform: `${show ? "rotate(-180deg)" : ""} scale(2)`,
          }}
          className={classes.slideIcon}
          onClick={() => {
            setShow(!show);
            setCategory("");
          }}
        />
      </Icon>
      <Slide direction="right" in={show}>
        <List className={classes.list}>
          {categories.map((el, i) => (
            <ListItem
              button
              key={i}
              alignItems="flex-start"
              divider
              className={classes.listItem}
              onClick={() => setCategory(el.text)}
            >
              {/** <ListItemIcon className={classes.itemIcon}>
                {el.icon}
              </ListItemIcon> */}
              <ListItemText className={classes.itemText}>
                <Typography variant="h6"> {el.text}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Slide>
    </div>
  );
};

export default Categories;
