import React, { Component } from "react";
import { connect } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Grid from "@material-ui/core/Grid";

import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../redux/cart/cart.reducer";
import CartItem from "./cart-item.component";
import "./cart.style.css";
import { Button } from "@material-ui/core";

class Cart extends Component {
  calculateTotalPrice = () => {
    if (!this.props.cartItems) return null;
    return this.props.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };
  render() {
    return (
      <aside
        className="cart-container"
        style={this.props.cartVisibility ? { right: 0 } : null}
      >
        <div className="cart-inner-container">
          <section className="cart-header-section">
            <div className="close-cart-button">
              <CloseOutlinedIcon
                onClick={() => {
                  this.props.setCartVisibility();
                }}
                fontSize="large"
              ></CloseOutlinedIcon>
            </div>
            <div className="cart-logo">
              <ShoppingCartOutlinedIcon
                color="disabled"
                fontSize="large"
              ></ShoppingCartOutlinedIcon>
            </div>
            <div className="border-line"></div>
          </section>
          <section className="cart-main-section">
            <ul className="cart-items-container">
              {Array.isArray(this.props.cartItems)
                ? this.props.cartItems.map((item) => (
                    <li key={item.uid}>
                      <CartItem product={item} quantity={item.quantity} />
                    </li>
                  ))
                : null}
            </ul>
          </section>
          <section className="cart-bottom-section">
            {Array.isArray(this.props.cartItems) &&
            this.props.cartItems.length > 0 ? (
              <Grid
                className="total-price-container"
                container
                justify="center"
              >
                <Grid item xs={12}>
                  <Button
                    size="large"
                    fullWidth
                    color="primary"
                    variant="contained"
                    style={{fontSize:"1.5em"}}
                  >
                    {this.calculateTotalPrice()}
                  </Button>
                </Grid>
              </Grid>
            ) : null}
          </section>
        </div>
      </aside>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
