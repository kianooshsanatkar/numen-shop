import { Grid } from "@material-ui/core";
import React, { Component } from "react";

import ProductItem from "./product-item.component";
import "./product-container.style.css";

class ProductContainer extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    if (this.props.labelId) {
      fetch("http://127.0.0.1:5000/api/label/products/" + this.props.labelId)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ products: data });
        });
    }
  }

  render() {
    console.log(this.state.products);
    return (
      <Grid container spacing={6}>
        {this.state.products.map((product) => (
          <ProductItem key={product.uid} product={product} />
        ))}
      </Grid>
    );
  }
}

export default ProductContainer;
