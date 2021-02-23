import {
  Container,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Radio,
} from "@material-ui/core";
import { getUser } from "../../services/user";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const userInStorage = useSelector((state) => state.user);
  console.log(userInStorage);
  useEffect(() => {
    if (!user) getUser().then((u) => setUser(u));
  }, [user]);

  // if (!user)
  //   getUser().then((u) => setUser(u));
  if (!userInStorage) {
    return <Redirect to="/" />;
  }

  return !user ? (
    <main></main>
  ) : (
    <main>
      <Container fixed style={{ paddingTop: "10vh" }}>
        <TableContainer
          component={Paper}
          style={{ direction: "rtl", backgroundColor: "#eee" }}
        >
          <Table className="product-properties" aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="right">
                  <h3>نام :</h3>
                </TableCell>
                <TableCell align="right">{user.first_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <h3>نام خانوادگی :</h3>
                </TableCell>
                <TableCell align="right">{user.last_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <h3>تلفن همراه :</h3>
                </TableCell>
                <TableCell align="right">{user.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <h3>ایمیل :</h3>
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
              </TableRow>
              {!user.addresses
                ? null
                : user.addresses.map((address) => (
                    <TableRow key={address.uid}>
                      <TableCell align="right">
                        <h3>آدرس :</h3>
                      </TableCell>
                      <TableCell align="right">
                        {address.postal_address}
                      </TableCell>
                      <TableCell align="center">
                        <Radio />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </main>
  );
}

// export default Profile;
