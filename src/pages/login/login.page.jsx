import React, { useState } from "react";
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

export default function Login(props) {
  const [user, setUser] = useState({ phone: null, password: null });

  const userSetter = (e) => {
    setUser({ [e.target.name]: e.target.value });
  };
  const sendData = () => {
    fetch(props.loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  return (
    <main>
      <Container fixed style={{ paddingTop: "10vh" }}>
        <Grid container alignContent="center">
          <Grid item xl={4} md={6} sm={8} xs={12} style={{ margin: "auto" }}>
            <TableContainer
              component={Paper}
              style={{
                direction: "rtl",
                backgroundColor: "#eee",
                width: "100%",
                padding:'3em 0'
              }}
            >
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">تلفن همراه:</TableCell>
                    <TableCell align="right">
                      <TextField
                        fullWidth
                        label="تلفن همراه"
                        name="phone"
                        value={user.phone}
                        onChange={userSetter}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">پسوورد :</TableCell>
                    <TableCell align="left">
                      <TextField
                        fullWidth
                        label="پسوورد"
                        name="password"
                        value={user.password}
                        onChange={userSetter}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Button
                      onClick={sendData}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        ورود
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
