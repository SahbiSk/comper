import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import Api from "../../redux/utils/Api";
import useStyles from "./styles";
import BeenhereIcon from "@material-ui/icons/Beenhere";

const Users = () => {
  const [users, setUsers] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const { data } = await Api.get("/users/ranking");
      setUsers(data.filter((el) => el._id !== user.userId));
    })();
    return () => {};
  }, [user.userId]);

  const t = ["Avatar", "Username", "Email", "Total Points", "Badge"];
  let usersData = users.map(
    ({ username, avatar, email, totalPnts, badge }) => ({
      avatar,
      username,
      email,
      totalPnts,
      badge: badge ? (
        <BeenhereIcon className={classes.badge} />
      ) : (
        "Not yet aquired"
      ),
    })
  );

  const server = "http://localhost:5000/";

  return (
    <Container width="lg" className={classes.container}>
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {t.map((el, i) => (
                <TableCell key={i} align="center">
                  <Typography variant="h6" color="primary" gutterBottom>
                    {el}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableBody}>
            {usersData.map((user, i) => (
              <TableRow key={i}>
                {Object.values(user).map((val, key) => (
                  <TableCell key={key} align="center">
                    {key === 0 ? (
                      <img
                        className={classes.img}
                        src={server + val}
                        alt="profile-pic"
                      />
                    ) : (
                      <Typography variant="body1" color="textPrimary">
                        {val}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
