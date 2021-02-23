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
import React,{useState, useEffect} from "react";
import { getUser, updateUser } from "../../services/user";
import {useSelector} from 'react-redux'

export default function EditableProfile() {
  const [user, setUser] = useState(null);
  const userInStorage = useSelector((state) => state.user);
  console.log(userInStorage);
  
  if (!user)
    getUser().then((u) => setUser(u));

  // useEffect(() => {
  //   if (!user) getUser().then((u) => setUser(u));
  // }, [user]);

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
                updateUser(user);
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
