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
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { updateUser, getUser } from "../../services/user";
import { getAddress, updateAddress } from "../../services/address";

export default function EditableProfile() {
  const history = useHistory();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [address, setAddress] = useState({
    city: "",
    zip_code: "",
    postal_address: "",
  });
  const [fetch, setFetch] = useState(false);

  const userInStorage = useSelector((state) => state.user);
  console.log(userInStorage);

  useEffect(() => {
    if (!fetch) {
      setFetch(true);
      getUser().then((u) => {
        if (u)
          setUser({
            ...user,
            ...u,
          });
      });
      getAddress().then((ad) => {
        if (ad)
          setAddress({
            ...address,
            ...ad,
          });
      });
    }
  }, [user, address, fetch]);

  const userSetter = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addressSetter = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
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
                  <TableRow>
                    <TableCell align="right">شهر :</TableCell>
                    <TableCell align="left">
                      <TextField
                        error={address.city.length < 2}
                        fullWidth
                        value={address.city}
                        onChange={addressSetter}
                        required
                        label="شهر"
                        name="city"
                        placeholder="تهران"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">کد پستی :</TableCell>
                    <TableCell align="left">
                      <TextField
                        error={
                          address.zip_code.length !== 0 &&
                          address.zip_code.length !== 10
                        }
                        fullWidth
                        value={address.zip_code}
                        onChange={addressSetter}
                        label="کد پستی"
                        placeholder="1234567890"
                        name="zip_code"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">آدرس :</TableCell>
                    <TableCell align="left">
                      <TextField
                        error={address.postal_address.length < 10}
                        multiline={true}
                        placeholder="استان، شهر، محله، خیابان، کوچه، پلاک، واحد"
                        variant="outlined"
                        fullWidth
                        required
                        label="آدرس"
                        name="postal_address"
                        value={address.postal_address}
                        onChange={addressSetter}
                      ></TextField>
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
                updateUser(user).then((userSucceed) => {
                  if (userSucceed) 
                  updateAddress(address).then((addressSucceed)=>{
                    if(addressSucceed)
                    history.push("/profile/");
                  }
                  
                  )
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
