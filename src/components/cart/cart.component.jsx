import React, { Component } from "react";
import { connect } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { mapDispatchToProps, mapStateToProps } from "../../redux/cart/cart-reducer";
import CartItem from "./cart-item.component";
import "./cart.style.css";

class Cart extends Component {
  render() {
    return (
      <aside className="cart-container" style={this.props.cartVisibility?{right:0}:null}>
          
        <div className='close-cart-button'>
            <CloseOutlinedIcon 
                onClick={() => {this.props.setCartVisibility()}}
                fontSize='large' 
                ></CloseOutlinedIcon>
        </div>
        <div className='cart-logo'>
            <ShoppingCartOutlinedIcon color="disabled" fontSize='large'></ShoppingCartOutlinedIcon>
        </div>
        <div className='border-line'></div>

        <ul className="cart-items-container">
          {this.props.cartItems
            ? this.props.cartItems.forEach((item) => {
                <li>
                  <CartItem key={item.uid} prop={item} />
                </li>;
              })
            : null}
        </ul>
      </aside>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
