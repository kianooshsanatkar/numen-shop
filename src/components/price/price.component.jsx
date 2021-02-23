import { Typography } from "@material-ui/core";
import React from "react";
import { FormatPrice } from "../../helper/calculator";

export default function Price({ price, color = null, variant, ...rest }) {
  return (
    <div>
      <Typography
        variant={variant ? variant : "h6"}
        color={color ? color : "textSecondary"}
        component="span"
        style={{ fontWeight: 900, fontStyle: 'italic', marginRight: ".5em" }}
        {...rest}
      >
        T
      </Typography>
      <Typography
        variant={variant ? variant : "h6"}
        component="span"
        color={color ? color : "textPrimary"}
        {...rest}
        noWrap
      >
        {FormatPrice(price)}
      </Typography>
    </div>
  );
}
