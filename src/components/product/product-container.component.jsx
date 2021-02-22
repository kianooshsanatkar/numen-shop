import { Grid } from "@material-ui/core";
import React, { Component } from "react";

import ProductItem from "./product-item.component";
import "./product-container.style.css";
import { getProducts } from "../../services/product";

class ProductContainer extends Component {
  state = {
    labelId: null,
    products: [],
  };

  fetchProducts() {
    this.setState({ labelId: this.props.labelId });
    getProducts(this.props.labelId).then((data) => {
      this.setState({ products: data });
    });
  }

  componentDidMount() {
    if (this.props.labelId) {
      this.fetchProducts();
    }
  }

  componentDidUpdate() {
    if (this.state.labelId !== this.props.labelId) {
      this.fetchProducts();
      return true;
    }
    return false;
  }

  render() {
    return (
      <Grid container spacing={6}>
        {this.state.products.map((product) => (
          <ProductItem
            key={product.uid}
            product={product}
            showPrice={this.props.showPrice}
          />
        ))}
      </Grid>
    );
  }
}

export default ProductContainer;
