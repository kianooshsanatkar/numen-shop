/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Profile from '../pages/profile-editable/profile-editable.page';

export default {
    title: 'Pages/EditableProfile',
    component: Profile
}

const Template = (args) => <Profile {...args} />

export const SimpleProfile = Template.bind({});

SimpleProfile.args = {
    getUserUrl: '/mocked/get-user.json',
    sendDataUrl: '/localhost/api/user/'
}