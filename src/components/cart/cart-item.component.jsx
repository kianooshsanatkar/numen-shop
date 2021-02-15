import { connect } from "react-redux";
import { Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React from "react";

import { mapDispatchToProps } from "../../redux/cart/cart.reducer";
import NoImage from "../../resource/images/no-image-available.jpg";

function getImagePath(fileName, size = "thumbnail") {
  if (fileName === null || fileName === undefined || fileName === "")
    return NoImage;
  let link_path = "/static/images/";
  return link_path + fileName + "_" + size + ".jpg";
}
function CartItem(props) {
  return (
    <div className="cart-item" style={{ borderBottom: "solid 1px black" }}>
      <Grid container justify="center">
        <Grid item xs={1}>
          <IconButton
            onClick={() => {
              props.removeCartItem(props.product.uid);
            }}
            style={{ marginTop: "6px" }}
            aria-label="delete icon"
          >
            <Close />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <img
            style={{ width: "70px" }}
            src={getImagePath(props.product.image)}
            alt={props.product.title}
          />
        </Grid>
        <Grid item xs={7}>
          <h3>{props.product.title}</h3>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <h3>{props.product.price * props.product.quantity}</h3>
        </Grid>
        <Grid item xs={7}>
          <h3>{props.product.quantity}</h3>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(CartItem);
