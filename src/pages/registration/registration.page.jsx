import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  Box,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { emailValidation, phoneValidation } from "../../helper/validation";
import { createUser } from "../../services/user";
import { mapDispatchToProps } from "../../redux/user.reducer";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import { connect } from 'react-redux';

function Register(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [city, setCity] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [err, setErr] = useState(true);
  const [checkErrors, setCheckErrors] = useState(false);
  const [snack, setSnack] = useState(false);
  const [succeed, setSucceed] = useState(false);

  if (succeed) {
    login(phone.slice(1), password).then((result) => {
      props.login(result[1]);
      history.push('/');
    });
  }

  const submit = () => {
    setErr(true);
    setCheckErrors(true);
    if (password !== rePassword) setErr(false);
    if (!lastName || !phone || !address || !password || !city) setErr(false);
    if (!phoneValidation(phone)) setErr(false);
    if (email.length > 0 && !emailValidation(email)) setErr(false);
    if (err) {
      createUser({
        first_name: firstName,
        last_name: lastName,
        email: email.length > 0 ? email : undefined,
        phone: phone.slice(1),
        password: password,
        address: address,
        city: city,
        zip_code: zip_code,
      }).then((response) => {
        console.log(response.ok);
        if (response.ok) {
          setSnack(true);
          setSucceed(true);
        } else {
          setSnack(true);
          setSucceed(false);
        }
      });
    }
  };

  return (
    <Container
      fixed
      maxWidth="sm"
      style={{ marginTop: "1em", direction: "rtl" }}
    >
      <Paper>
        <div
          style={{
            textAlign: "center",
            padding: ".5em",
            marginBottom: "0.5em",
            backgroundColor: "#333",
            color: "white",
          }}
        >
          <Typography variant="h2">ثبت نام</Typography>
        </div>
        <Box p={3}>
          <Grid container spacing={3}>
            {err ? null : (
              <Grid item>
                <Typography color="error">
                  لطفا مقادیر را به درستی وارد نمایید
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="نام"
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={checkErrors && lastName.length < 4}
                variant="outlined"
                fullWidth
                required
                label="نام خانوادگی"
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={checkErrors && !phoneValidation(phone)}
                type="tel"
                placeholder="09121111111"
                variant="outlined"
                fullWidth
                required
                label="تلفن همراه"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  checkErrors && email.length > 0 && !emailValidation(email)
                }
                type="email"
                variant="outlined"
                fullWidth
                label="ایمیل"
                name="email"
                placeholder="example@site.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={checkErrors && city.length < 2}
                fullWidth
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
                label="شهر"
                placeholder="تهران"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={
                  checkErrors && zip_code.length !== 0 && zip_code.length !== 10
                }
                fullWidth
                value={zip_code}
                onChange={(e) => {
                  setZipCode(e.target.value);
                }}
                label="کد پستی"
                placeholder="1234567890"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={checkErrors && address.length < 10}
                multiline={true}
                placeholder="استان، شهر، محله، خیابان، کوچه، پلاک، واحد"
                variant="outlined"
                fullWidth
                required
                label="آدرس"
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={checkErrors && password.length < 4}
                variant="outlined"
                fullWidth
                required
                type="password"
                label="پسورد"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                required
                type="password"
                label="تکرار پسورد"
                name="rePassword"
                error={password !== rePassword}
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={submit}
              >
                ثبت
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            open={snack}
            autoHideDuration={4000}
            onClose={() => {
              setSnack(false);
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            {succeed ? (
              <Alert
                variant="filled"
                severity="success"
                style={{ padding: "0 .5em" }}
              >
                اکانت شما با موفقیت ساخته شد
              </Alert>
            ) : (
              <Alert
                variant="filled"
                severity="error"
                style={{ padding: "0 .5em" }}
              >
                متاسفانه خطایی رخ داده. درصورت تکرار با پشتیبانی تماس بگیرید
              </Alert>
            )}
          </Snackbar>
        </Box>
      </Paper>
    </Container>
  );
}

export default connect(null, mapDispatchToProps)(Register);