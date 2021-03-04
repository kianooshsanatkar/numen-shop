import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { mapStateToProps, mapDispatchToProps } from "../../redux/cart.reducer";
import { addDiscount } from "../../redux/cart.reducer";

import {
  getDiscount,
  saveCartItems,
  createInvoice,
  getAddress,
} from "../../services";

import { calculateTotalDiscount } from "../../helper/calculator";
import { calculateTotalPrice } from "../../helper/calculator";

import Price from "../../components/price/price.component";
import CartItem from "./cartItem.component";
import LoginDialog from "../../components/dialog.login";
import ErrorDialog from "../../components/dialog.error";

const useStyle = makeStyles({
  finalPrice: {
    color: green[500],
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function CartPage(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyle();

  const savedDiscount = useSelector((state) => state.cart.discount);
  const user = useSelector((state) => state.user.user);

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [loginDialog, setLoginDialog] = useState(false);
  const [address, setAddress] = useState(null);
  const [approveAddress, setApproveAddress] = useState(false);
  const [err, setErr] = useState({ show: false, content: '', title: '' });

  useEffect(() => {
    getAddress().then((add) => {
      if (!add) {
        setErr({
          show: true,
          content:
            "اکانت شما فاقد آدرس می باشد. لطفا با مراجعه به تنظیمات اکانت آدرس خود را تکمیل نمایید.",
          title: "خطای آدرس",
        });
      } else {
        setAddress(add);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) setLoginDialog(true);
    else setLoginDialog(false);
  }, [user]);

  useEffect(() => {
    if (discount) {
      dispatch(addDiscount(discount));
    } else if (savedDiscount) {
      setDiscount(savedDiscount);
      setCouponCode(savedDiscount.code);
    }
  }, [discount, dispatch, savedDiscount]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(props.cartItems));
    setTotalDiscount(calculateTotalDiscount(totalPrice, discount));
  }, [props.cartItems, totalPrice, discount]);

  function submitCoupon() {
    if (discount) {
      setCouponCode("");
      setDiscount(null);
      dispatch(addDiscount(null));
    } else
      getDiscount(couponCode).then((discount) => {
        setDiscount(discount);
      });
  }

  function submitCart() {
    if (!approveAddress) {
      setErr({
        show: true,
        content:
          "شما هیچ آدرسی را انتخاب نکرده اید لطفا آدرس خود را انتخاب کنید.",
        title: "خطای آدرس",
      });
      return false;
    }
    if (props.cartItems.length > 0) {
      const items = props.cartItems.map((item) => ({
        product_id: item.uid,
        quantity: item.quantity,
      }));
      saveCartItems(items).then((ok) => {
        if (ok)
          createInvoice().then((ok) => {
            if (ok) history.push("/invoice/");
          });
      });
    } else {
      setErr({
        show: true,
        content: "شما هیچ کالایی برای خرید انتخاب نکرده اید!",
        title: "خطای کالا",
      });
    }
  }

  return !props.cartItems ? (
    <main></main>
  ) : (
    <main style={{ direction: "rtl" }}>
      <ErrorDialog
        title={err.title}
        context={err.content}
        open={err.show}
        onOk={() => {
          setErr({ ...err, show: false });
        }}
      ></ErrorDialog>
      <Container fixed>
        <Paper>
          <Grid container>
            <Grid item xs={4} sm={3} md={2}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={approveAddress}
                    onChange={() => {
                      setApproveAddress(!approveAddress);
                    }}
                    name="approveAddress"
                  />
                }
                label="تایید آدرس"
                disabled={address === null}
              />
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              {address ? address.city + "-" + address.postal_address : null}
            </Grid>
          </Grid>
        </Paper>
        {props.cartItems.map((item) => (
          <CartItem key={item.uid} {...item}></CartItem>
        ))}

        <Box mt={5} p={5} style={{ textAlign: "center" }}>
          <Paper>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={6} sm={3}>
                <Typography variant="h5">جمع کل</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price variant="body1" price={totalPrice} />
              </Grid>
              {/* </Grid>
            <Grid container spacing={4} > */}
              <Grid item xs={6} sm={3}>
                <TextField
                  fullWidth
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                  variant="outlined"
                  label="کد تخفیف"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button
                  variant="contained"
                  onClick={submitCoupon}
                  color={discount ? "secondary" : "default"}
                >
                  {!discount ? "ثبت" : "حذف"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" className={classes.finalPrice}>
                  مبلغ نهایی
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price
                  className={classes.finalPrice}
                  price={totalPrice - totalDiscount}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography color="secondary" variant="h5">
                  تخفیف
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price color="secondary" price={totalDiscount} />
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box m={2} p={5}>
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            onClick={submitCart}
          >
            تایید
          </Button>
        </Box>
      </Container>
      <LoginDialog
        dialog={loginDialog}
        disableDialog={() => {
          if (user) setLoginDialog(false);
        }}
      />
    </main>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
