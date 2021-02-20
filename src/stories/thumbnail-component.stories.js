import React from 'react'


import Thumbnail from '../components/thumbnail';


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    title:'Components/Image',
    component: Thumbnail
}

const Template = (args)=> <Thumbnail {...args} />

export const SimpleThumbnail = Template.bind({});
SimpleThumbnail.args={ 
    src: "05da67b3-7ca4-42cb-a0bf-bb345423a9d9",
    alt: "my image"
}