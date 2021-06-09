import {
  Container,
  Grid,
  Hidden,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NoImage from "../../resource/images/no-image-available.jpg";

import HeightSpace from "../../components/space/space.component";
import "./product.style.css";
import { connect } from "react-redux";
import { getProduct } from "../../services/product";

import {
  mapDispatchToProps as cartDrawerDispatch,
  mapStateToProps as cartDrawerState,
} from "../../redux/cart-drawer.reducer";
import {
  mapStateToProps as cartState,
  mapDispatchToProps as cartDispatch,
} from "../../redux/cart.reducer";
import { LandScape, SmallImage } from "../../components/image";

class ProductPage extends Component {
  state = {
    product: null,
    images: [],
    selectedImage: '',
  };
  componentDidMount() {
    let productId = this.props.match.params.productId;
    getProduct(productId).then((data) => {
      this.setState({
        product: data,
        images: data.images_file,
        selectedImage:
          data.images_file && data.images_file.length > 0
            ? data.images_file[0]
            : '',
      });
    });
  }

  getImagePath(fileName, size = "small") {
    if (fileName === null || fileName === undefined || fileName === "")
      return NoImage;
    let link_path = "/static/images/";
    return link_path + fileName + "_" + size + ".jpg";
  }

  setTBody(properties) {
    const rows = [];
    for (let [key, val] of Object.entries(properties)) {
      rows.push(
        <TableRow key={key}>
          <TableCell align="right">
            <strong>{key}:</strong>
          </TableCell>
          <TableCell align="right">{val}</TableCell>
        </TableRow>
      );
    }
    return rows;
  }

  render() {
    return (
      <main>
        <HeightSpace></HeightSpace>
        {!this.state.product ? null : (
          <Container fixed>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Grid container className="product-images-container">
                  <Hidden smUp>
                    <Grid item xs={12}>
                      <h1>{this.state.product.title}</h1>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12}>
                    <LandScape
                      className="product-images"
                      src={this.state.selectedImage}
                      alt={this.state.product.title}
                    />
                  </Grid>
                  <Grid item container xs={12} spacing={2}>
                    {this.state.images.map((image) => (
                      <Grid key={image} item xs={4} md={3}>
                        <SmallImage
                          className="product-images"
                          onClick={() =>
                            this.setState({ selectedImage: image })
                          }
                          src={image}
                          alt={this.state.product.title}
                        />
                        {/* <img
                          className="product-images"
                          onClick={() =>
                            this.setState({ selectedImage: image })
                          }
                          src={this.getImagePath(image)}
                          alt={this.state.product.title}
                        /> */}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Hidden xsDown>
                  <h1>{this.state.product.title}</h1>
                </Hidden>
                <HeightSpace Height="10vh" />
                <p className="product-description">
                  {this.state.product.description}
                </p>
              </Grid>
              <Grid item sm={6} xs={12}>
                {!this.state.product.properties ? null : (
                  <TableContainer
                    component={Paper}
                    style={{ direction: "rtl", backgroundColor: "#ccc" }}
                  >
                    <Table
                      className="product-properties"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">
                            <h3>مشخصات</h3>
                          </TableCell>
                          <TableCell align="right">
                            <h3>مقدار</h3>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.setTBody(this.state.product.properties)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  fullWidth
                  style={{ top: "50%", marginTop: "-1em", fontSize: "1.5em" }}
                  onClick={() => {
                    this.props.showCartDrawer();
                    this.props.setCartItems({
                      uid: this.state.product.uid,
                      title: this.state.product.title,
                      price: this.state.product.price,
                      quantity: 1,
                      image: this.state.selectedImage,
                    });
                  }}
                >
                  {this.state.product.price}
                </Button>
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return { ...cartDrawerState(state), ...cartState(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    ...cartDrawerDispatch(dispatch),
    ...cartDispatch(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductPage));
