import {
  Container,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Radio,
  Button,
} from "@material-ui/core";
import { getUser } from "../../services/user";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { userLogoutAction } from "../../redux/user.reducer";
import { isTokenFresh } from "../../services/auth";
import FreshDialog from "../../components/dialog.token-freshness/";
import { Logout } from "../../services/auth";
import {getAddress} from '../../services/address';

export default function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    city: "",
    zip_code: "",
    postal_address: "",
  });
  const [authDialog, setAuthDialog] = useState(false);
  const [fetch, setFetch] = useState(false);
  const userInStorage = useSelector((state) => state.user);
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
              {/* {!user.addresses
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
                  ))} */}
              <TableRow>
                <TableCell align="right"><h3>شهر :</h3></TableCell>
                <TableCell align="right">{address.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right"><h3>کد پستی :</h3></TableCell>
                <TableCell align="right">{address.zip_code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right"><h3>آدرس :</h3></TableCell>
                <TableCell align="right">{address.postal_address}</TableCell>
              </TableRow>
                <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      isTokenFresh().then((result) => {
                        if (result) history.push("/profile/edit/");
                        else setAuthDialog(true);
                      });
                    }}
                    fullWidth
                  >
                    ویرایش
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      Logout();
                      dispatch(userLogoutAction());
                      history.push("/");
                    }}
                    fullWidth
                  >
                    خروج
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <FreshDialog
        dialog={authDialog}
        disableDialog={() => {
          setAuthDialog(false);
        }}
        callbackIfSucceed={() => {history.push('/profile/edit/')}}
      />
    </main>
  );
}

// export default Profile;
