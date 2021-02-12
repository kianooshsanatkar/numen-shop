import React from "react";
import Grid from "@material-ui/core/Grid";
import { IconButton, Typography } from "@material-ui/core";
import NoImage from "../../resource/images/no-image-available.jpg";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  let link_path = "http://127.0.0.1:5000/static/images/";
  let suffix = "_small.jpg";
  let images = props.product.images ? props.product.images.split(",") : null;
  return (
    <Grid item xs={6} sm={3}>
      <Link to={"/product/" + props.product.uid}>
        <div className="product-item">
          <img
            src={!images ? NoImage : link_path + images[0] + suffix}
            alt={props.product.title}
          />
          <div className="product-item-title">
            <Typography variant="h5" className="yekan-text">
              {props.product.title}
            </Typography>
          </div>
        </div>
      </Link>
    </Grid>
  );
}
