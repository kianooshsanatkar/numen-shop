import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { IconButton, Typography } from "@material-ui/core";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";

import { mapDispatchToProps } from "../../redux/cart/cart.reducer";
import NoImage from "../../resource/images/no-image-available.jpg";
import { Link } from "react-router-dom";

function ProductItem(props) {
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
      {props.showPrice === true ? (
        <Grid item container xs={12}>
          <Grid item xs={8} style={{ textAlign: "left", paddingLeft: "10px" }}>
            <h3>{props.product.price}</h3>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              style={{ float: "right" }}
              onClick={() => {
                props.setCartVisibility(true);
                props.setCartItems({
                  uid: props.product.uid,
                  title: props.product.title,
                  price: props.product.price,
                  quantity: 1,
                  image: images ? images[0] : null,
                });
              }}
              color="primary"
              aria-label="add to shopping cart"
            >
              <AddShoppingCartRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default connect(null, mapDispatchToProps)(ProductItem);
