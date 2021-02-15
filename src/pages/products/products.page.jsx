import { Container, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import ProductContainer from "../../components/product/product-container.component";
import HeightSpace from "../../components/space/space.component";
import "./products.style.css";

class Products extends Component {
  state = {
    label: null,
  };

  fetchLabelData() {
    let labelId = this.props.match.params.labelId;
    fetch("/api/label/" + labelId)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          label: data,
        });
      });
  }

  componentDidMount() {
    this.fetchLabelData();
  }

  componentDidUpdate(){
    if(this.state.label && String(this.state.label.uid) !== this.props.match.params.labelId){
      this.fetchLabelData()
    }
  }

  render() {
    if (!this.state.label) return <div></div>;
    return (
      <main>
        <HeightSpace Height="10vh"></HeightSpace>
        <h1 className="products-title">{this.state.label.title}</h1>
        <div className="products-cover-image"></div>
        <Container fixed={true}>
          <Grid container>
            <Grid item xs={12}>
              <p className="products-description">{this.state.label.description}</p>
            </Grid>
          </Grid>
          <HeightSpace></HeightSpace>
          <ProductContainer labelId={this.state.label.uid} showPrice={true} />
        </Container>
      </main>
    );
  }
}

export default withRouter(Products);
