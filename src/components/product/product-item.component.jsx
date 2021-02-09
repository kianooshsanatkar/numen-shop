import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

export default function ProductItem(props) {
  let link_path = "http://127.0.0.1:5000/static/images/";
  let suffix = "_small.jpg";
  let images = props.product.images ? props.product.images.split(",") : null;
  return (
    <Grid item xs={6} sm={3}>
      <div className="product-item">
        {images ? (
          <img src={link_path + images[0] + suffix} alt={props.product.title} />
        ) : null}
        <div className="product-item-title">
          <Typography variant="h5" className="yekan-text">
            {props.product.title}
          </Typography>
        </div>
      </div>
    </Grid>
  );
}
