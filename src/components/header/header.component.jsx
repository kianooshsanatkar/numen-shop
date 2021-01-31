import React from "react";
import Menu from "../navmenu/menu.component";
import Logo from '../../resource/images/logo.png'
import Cart from '../cart/cart.component'

export default function Header(params) {
  return (
    <div>
      <Menu></Menu>
      <img src={Logo} alt='Numen Flame' />
      <Cart></Cart>
    </div>
  );
};
