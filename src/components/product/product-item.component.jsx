import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { IconButton, Typography } from "@material-ui/core";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";

import {
  mapDispatchToProps as cartDrawerDispatch
} from "../../redux/cart-drawer.reducer";
import { mapDispatchToProps as cartDispatch } from "../../redux/cart.reducer";
import NoImage from "../../resource/images/no-image-available.jpg";
import { Link } from "react-router-dom";
import getRelativeImageUrl, {ImageSize} from '../../helper/images';


function ProductItem(props) {
  let images = props.product.images ? props.product.images.split(",") : null;
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Link to={"/product/" + props.product.uid}>
        <div className="product-item">
          <img
            src={!images ? NoImage : getRelativeImageUrl(images[0], ImageSize.Small)}
            alt={props.product.title}
          />
          <div className="product-item-title">
            <Typography variant="h5">
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
                props.showCartDrawer();
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


function mapDispatchToProps(dispatch){
  return {
    ...cartDispatch(dispatch),
    ...cartDrawerDispatch(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ProductItem);
