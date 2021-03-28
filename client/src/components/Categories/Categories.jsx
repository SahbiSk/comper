import {
  Slide,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Typography,
} from "@material-ui/core";
import { GiSwimfins } from "react-icons/gi";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useStyles from "./styles";
import React, { useState } from "react";

const Categories = () => {
  const categories = [
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
    {
      text: "text",
      icon: <GiSwimfins />,
    },
  ];
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
          onClick={() => setShow(!show)}
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
            >
              <ListItemIcon className={classes.itemIcon}>
                {el.icon}
              </ListItemIcon>
              <ListItemText className={classes.itemText}>
                <Typography variant="h6" > {el.text}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Slide>
    </div>
  );
};

export default Categories;
