import { Typography } from '@material-ui/core'
import React from 'react';
import {FormatPrice} from '../../helper/calculator';


export default function Price(props) {
    return(
        <div>
            <Typography variant="h6" color="textSecondary" component="span" style={{fontWeight:900, marginRight:'.2em'}}>T</Typography>
            <Typography variant="h6" component="span"noWrap>{FormatPrice(props.price)}</Typography>
        </div>
    )
}