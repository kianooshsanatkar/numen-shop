import { Grid } from "@material-ui/core";
import React from "react";

import NoImage from "../../resource/images/no-image-available.jpg";

function getImagePath(fileName, size = "thumbnail") {
  if (fileName === null || fileName === undefined || fileName === "")
    return NoImage;
  let link_path = "http://127.0.0.1:5000/static/images/";
  return link_path + fileName + "_" + size + ".jpg";
}
export default function CartItem(props) {
  return (
    <div className="cart-item" style={{ borderBottom: "solid 1px black" }}>
      <Grid container justify="center">
        <Grid item xs={4}>
          <img
            style={{ width: "70px" }}
            src={getImagePath(props.product.image)}
            alt={props.product.title}
          />
        </Grid>
        <Grid item xs={8}>
          <h3>{props.product.title}</h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}>
          <h3>{props.product.price * props.product.quantity}</h3>
        </Grid>
        <Grid item xs={8}>
          <h3>{props.product.quantity}</h3>
        </Grid>
      </Grid>
    </div>
  );
}
