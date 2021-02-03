import React, { Component } from "react";
import { connect } from "react-redux";

import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { Spiral as Hamburger } from "hamburger-react";

import Menu from "../navmenu/menu.component";
import Logo from "../../resource/images/logo.png";
import Cart from "../cart/cart.component";

import "./header.style.css";
import { mapDispatchToProps } from "../../redux/cart/cart-reducer";

class Header extends Component {
  state = {
    menuVisibility: false,
  };
  render() {
    return (
      <header>
        <nav className="header-nav">
          <div className="menu-button">
            <Hamburger
              direction="right"
              toggle={()=>this.setState((prevState, prevProps) => ({
                menuVisibility: !prevState.menuVisibility,
              }))}
              toggled={this.state.menuVisibility}
            ></Hamburger>
          </div>
          <img src={Logo} alt="Numen Flame" className="numen-logo" />
          <div className="cart-button">
            <ShoppingCartOutlinedIcon
              fontSize="large"
              onClick={() => {
                this.props.setCartVisibility();
              }}
              style={{ zIndex: 10 }}
            ></ShoppingCartOutlinedIcon>
          </div>
          <div className="header-border"></div>
        </nav>
        <Menu
          menuVisibility={this.state.menuVisibility}
          closeMenu={() => this.setState({ menuVisibility: false })}
        ></Menu>
        <Cart></Cart>
      </header>
    );
  }
}
export default connect(null, mapDispatchToProps)(Header);
