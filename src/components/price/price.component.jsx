import { Typography } from "@material-ui/core";
import React from "react";
import { FormatPrice } from "../../helper/calculator";

export default function Price(props) {
  return (
    <div>
      <Typography
        variant="h6"
        color={props.color ? props.color : "textSecondary"}
        component="span"
        style={{ fontWeight: 900, marginRight: ".2em" }}
      >
        T
      </Typography>
      <Typography variant="h6" component="span" color={props.color?props.color:"textPrimary"} noWrap>
        {FormatPrice(props.price)}
      </Typography>
    </div>
  );
}
