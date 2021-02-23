import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import CartItem from "./cartItem.component";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/cart.reducer";
import { calculateTotalPrice } from "../../helper/calculator";
import Price from "../../components/price/price.component";
import { getDiscount } from "../../services/product";
import { useDispatch, useSelector } from "react-redux";
import { addDiscount } from "../../redux/cart.reducer";
import { calculateTotalDiscount } from "../../helper/calculator";
import {green} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  finalPrice:{
    color: green[500]
  }
})


function CartPage(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const savedDiscount = useSelector((state)=>(state.cart.discount));
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  function submitCoupon() {
    if(discount)
      {
        setCouponCode('');
        setDiscount(null);
        dispatch(addDiscount(null));
      }
    else
    getDiscount(couponCode).then((discount) => {
      setDiscount(discount);
    });
  }

  useEffect(() => {
    if(discount)
      dispatch(addDiscount(discount));
    else if(savedDiscount){
      setDiscount(savedDiscount);
      setCouponCode(savedDiscount.code);
    }
    setTotalPrice(calculateTotalPrice(props.cartItems));
    setTotalDiscount(calculateTotalDiscount(totalPrice, discount));
  }, [props.cartItems, totalPrice, discount, dispatch, savedDiscount]);
  
  return !props.cartItems ? (
    <main></main>
  ) : (
    <main style={{ direction: "rtl" }}>
      <Container fixed>
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
                <Price variant='body1' price={totalPrice} />
              </Grid>
              {/* </Grid>
            <Grid container spacing={4} > */}
              <Grid item xs={6} sm={3}>
                <TextField fullWidth value={couponCode} onChange={(e)=>{setCouponCode(e.target.value)}} variant="outlined" label="کد تخفیف" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button variant="contained" onClick={submitCoupon} color={discount?"secondary":"default"}>
                  {!discount?"ثبت" : "حذف"}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper>
            <Grid container spacing={4}>
            <Grid item xs={6} sm={3}>
                <Typography variant="h5" className={classes.finalPrice}>مبلغ نهایی</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price className={classes.finalPrice} price={totalPrice - totalDiscount} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography color="secondary" variant="h5">تخفیف</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price color="secondary" price={totalDiscount} />
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box m={2} p={5}>
          <Button fullWidth size="large" color="primary" variant="contained">
            تایید
          </Button>
        </Box>
      </Container>
    </main>
  );
}

// export default CartCheckPage;
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
