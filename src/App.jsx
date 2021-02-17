import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Main from "./pages/main/main.page";
import Products from "./pages/products/products.page";
import ProductPage from "./pages/product/product.page";
import { mapDispatchToProps } from "./redux/user.reducer";
import "./App.css";

class App extends Component {
  state = {
    is_hidden: false,
  };

  componentDidMount() {
    fetch("/auth/token/access/")
      .then((response) => {
        console.log("Response:", response);
        if (
          response.status === 401 &&
          response.json().msg === "Token has expired"
        ) {
          fetch("/auth/token/refresh/")
            .then((response) => response.json())
            .then((data) => {
              this.props.login(data);
            });
          return null;
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        if (data)
          this.props.login(data);
      });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <div>
            <Switch>
              <Route exact path="/product/:productId">
                <ProductPage></ProductPage>
              </Route>
              <Route exact path="/products/:labelId">
                <Products />
              </Route>
              <Route path="/">
                <Main></Main>
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer></Footer>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
