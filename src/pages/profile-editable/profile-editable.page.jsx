import {
  Container,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { updateUser } from "../../services/user";
import { useHistory } from "react-router-dom";

export default function EditableProfile() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  const userSetter = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return !user ? (
    <main></main>
  ) : (
    <main>
      <Container fixed maxWidth="sm" style={{ paddingTop: "10vh" }}>
        <Grid container alignContent="center">
          <Grid item sm={10} xs={12} style={{ margin: "auto" }}>
            <TableContainer
              component={Paper}
              style={{
                direction: "rtl",
                backgroundColor: "#eee",
                width: "100%",
              }}
            >
              <Table className="product-properties" aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">نام :</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        color="primary"
                        label="نام"
                        name="first_name"
                        variant="outlined"
                        value={user.first_name}
                        onChange={userSetter}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">نام خانوادگی :</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        label="نام خانوادگی"
                        name="last_name"
                        variant="outlined"
                        value={user.last_name}
                        onChange={userSetter}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">تلفن همراه:</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        label="تلفن همراه"
                        name="phone"
                        variant="outlined"
                        value={user.phone}
                        placeholder="09121234567"
                        onChange={userSetter}
                        type="tel"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">ایمیل :</TableCell>
                    <TableCell align="left">
                      <TextField
                        fullWidth
                        label="ایمیل"
                        name="email"
                        variant="outlined"
                        value={user.email}
                        onChange={userSetter}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={10} xs={12} style={{ margin: "auto", padding: "1em" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                updateUser(user).then((sent) => {
                  if (sent) history.push("/profile/");
                });
              }}
            >
              ذخیره
            </Button>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
