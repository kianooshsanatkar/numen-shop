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
import React, { useState, useEffect } from "react";

function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    fetch(props.getUserUrl)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, [props.getUserUrl]);

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
                      <TableCell align="right">{address.postal_address}</TableCell>
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

export default Profile;
