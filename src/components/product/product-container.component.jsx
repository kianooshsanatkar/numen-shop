import { Grid } from "@material-ui/core";
import React, { Component } from "react";

import ProductItem from "./product-item.component";
import './product-container.style.css';

class ProductSlider extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:5000/api/label/products/1")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data });
      });
  }

  render() {
      console.log(this.state.products)
    return (
      <Grid container spacing={6}>
        {this.state.products.map((product) => (
          <ProductItem key={product.uid} product={product} />
        ))}
      </Grid>
    );
  }
}

export default ProductSlider;
