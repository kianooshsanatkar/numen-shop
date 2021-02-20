/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Login from '../pages/login/login.page';

export default {
    title: 'Pages/LoginPage',
    component: Login
}

const Template = (args) => <Login {...args} />

export const SimpleProfile = Template.bind({});

SimpleProfile.args={
    loginUrl:null
}