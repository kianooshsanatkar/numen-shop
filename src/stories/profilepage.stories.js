import React from 'react';

import Profile from '../pages/profile/profile.page';

const ret = {
    title: 'Pages/Profile',
    component: Profile
}
export default ret;

const Template = (args) => <Profile {...args} />

export const SimpleProfile = Template.bind({});

SimpleProfile.args={
    getUserUrl: '/mocked/get-user.json'
}