/* eslint-disable import/no-anonymous-default-export */
import CartCheckPage from '../pages/cart-check';
import React from 'react';

export default {
    title: "Pages/CheckCart"
    , component: CartCheckPage
};

const Template = (args) => <CartCheckPage {...args} />

export const SimpleCart = Template.bind({});

SimpleCart.args = {
    cartItems: [
        {
            uid: 1,
            title: "صابون زیتون",
            price: "400000",
            quantity: 3,
            image: "e220b724-1cd2-4a64-9282-f471e07f7545",
            add: () => { },
            remove: () => { },
            delete: () => { }
        },
        {
            uid: 2,
            title: "صابون رس بزرگ",
            price: "600000",
            quantity: 3,
            image: "e220b724-1cd2-4a64-9282-f471e07f7545",
            add: () => { },
            remove: () => { },
            delete: () => { }
        }
    ]
}