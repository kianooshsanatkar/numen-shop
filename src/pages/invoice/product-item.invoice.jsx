import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

import NoImage from "../../resource/images/no-image-available.jpg";
import { Link } from "react-router-dom";
import getRelativeImageUrl, { ImageSize } from "../../helper/images";

function ProductItem({ product }) {
  let images = product.images ? product.images.split(",") : null;
  return (
    <Grid item xs={4} sm={3} md={2}>
      <Link to={"/product/" + product.uid}>
        <div className="product-item">
          <img
            src={
              !images
                ? NoImage
                : getRelativeImageUrl(images[0], ImageSize.Small)
            }
            alt={product.title}
          />
          <div className="product-item-title">
            <Typography variant="body1">{product.title}</Typography>
          </div>
        </div>
      </Link>
      <Grid item container xs={12}>
        <Grid item xs={8} style={{ textAlign: "left", paddingLeft: "10px" }}>
          <Typography variant="body1">{product.price}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProductItem;
