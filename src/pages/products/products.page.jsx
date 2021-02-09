import React, { Component } from "react";

import ProductContainer from '../../components/product/product-container.component';

export default class Products extends Component {
  render() {
    return <main>
      <ProductContainer labelId={this.props.selectedLabel} />
    </main>;
  }
}
