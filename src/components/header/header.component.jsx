import React from "react";
import { connect } from "react-redux";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Spiral as Hamburger } from "hamburger-react";

import Menu from "../navmenu/menu.component";
import Logo from "../../resource/images/logo.png";
import Cart from "../cart/cart.component";

import "./header.style.css";
import { mapDispatchToProps } from "../../redux/cart/cart-reducer";

function Header(props) {
  return (
    <header>
      <nav className="header-nav">
        <div className="menu-button">
          <Hamburger direction="right"></Hamburger>
        </div>
        <img src={Logo} alt="Numen Flame" className="numen-logo" />
        <div className="cart-button">
          <ShoppingCartOutlinedIcon
            fontSize="large"
            onClick={() => {
              props.setCartVisibility();
            }}
            style={{ zIndex: 10 }}
          ></ShoppingCartOutlinedIcon>
        </div>
      <div className="header-border"></div>
      </nav>
      <Menu></Menu>
      <Cart></Cart>
    </header>
  );
}

export default connect(null, mapDispatchToProps)(Header);
