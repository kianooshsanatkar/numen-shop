import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Spiral as Hamburger } from "hamburger-react";

import Menu from "../navmenu/menu.component";
import Logo from "../../resource/images/logo.png";
import Cart from "../cart/cart.component";

import "./header.style.css";
import {
  mapDispatchToProps,
  mapStateToProps as cartDrawerState,
} from "../../redux/cart-drawer.reducer";
import { mapStateToProps as cartState } from "../../redux/cart.reducer";

class Header extends Component {
  state = {
    menuVisibility: false,
  };

  totalQuantityCalculator() {
    let q = this.props.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    if (q > 9) q = 9;
    return q;
  }

  render() {
    const totalQuantity = this.totalQuantityCalculator();
    return (
      <header>
        <nav className="header-nav">
          <div className="menu-button">
            <Hamburger
              direction="right"
              toggle={() =>
                this.setState((prevState, prevProps) => ({
                  menuVisibility: !prevState.menuVisibility,
                }))
              }
              toggled={this.state.menuVisibility}
            ></Hamburger>
          </div>
          <Link to="/">
            <img src={Logo} alt="Numen Flame" className="numen-logo" />
          </Link>
          <div className="cart-button">
            <ShoppingCartOutlinedIcon
              fontSize="large"
              onClick={() => {
                this.props.toggleCartDrawer();
              }}
              style={{ zIndex: 10 }}
            ></ShoppingCartOutlinedIcon>
            {totalQuantity > 0 ? (
              <div className="cart-items-number">{totalQuantity}</div>
            ) : null}
          </div>
          <div className="header-border"></div>
        </nav>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            cursor: "pointer",
            backgroundColor: "rgba(0,0,0,.1)",
            display:
              this.state.menuVisibility || this.props.cartVisibility
                ? "block"
                : "none",
          }}
          onClick={() => {
            this.props.hideCartDrawer();
            this.setState({ menuVisibility: false });
          }}
        ></div>
        <Menu
          menuVisibility={this.state.menuVisibility}
          closeMenu={() => this.setState({ menuVisibility: false })}
        ></Menu>
        <Cart></Cart>
      </header>
    );
  }
}

function localMapStateToProps(state) {
  return { ...cartDrawerState(state), ...cartState(state) };
}

export default connect(localMapStateToProps, mapDispatchToProps)(Header);
