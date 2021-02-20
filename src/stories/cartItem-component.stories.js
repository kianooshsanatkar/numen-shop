/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import CartItem from '../pages/cart-check/cart.component';

export default {
    title: "Pages/CartComponent"
    , component: CartItem
}

const Template = (args) => <CartItem {...args} />

export const SimpleCartItem = Template.bind({});

SimpleCartItem.args = {
    uid: 1,
    images: "",
    title: "صابون",
    quantity: 2,
    price: 100000,
    add: () => { },
    remove: () => { },
    delete: () => { }
}