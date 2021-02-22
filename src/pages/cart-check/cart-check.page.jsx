import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import CartItem from "./cartItem.component";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/cart/cart.reducer";
import { calculateTotalPrice } from "../../helper/calculator";
import Price from "../../components/price/price.component";


function CartCheckPage(props) {
  return !props.cartItems ? (
    <main></main>
  ) : (
    <main style={{ direction: "rtl" }}>
      <Container fixed>
        {props.cartItems.map((item) => (
          <CartItem key={item.uid} {...item}></CartItem>
        ))}

        <Box mt={5} p={5}  style={{textAlign:"center"}}>
          <Paper>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={6} sm={3}>
              <Typography variant="h5" >جمع کل</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price price={calculateTotalPrice(props.cartItems)}/>
              </Grid>
            {/* </Grid>
            <Grid container spacing={4} > */}
              <Grid item xs={6} sm={3}>
                <TextField fullWidth variant="outlined" label="کد تخفیف" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Button variant="contained">ثبت</Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h5" >مبلغ نهایی</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Price price={calculateTotalPrice(props.cartItems)}/>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box m={2} p={5}>
          <Button fullWidth size="large" color="primary" variant="contained" >تایید</Button>
        </Box>
      </Container>
    </main>
  );
}

// export default CartCheckPage;
export default connect(mapStateToProps,mapDispatchToProps)(CartCheckPage);
