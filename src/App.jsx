import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { mapDispatchToProps } from "./redux/cart/cart-reducer";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Main from "./pages/main/main.page";
import "./App.css";
import Products from "./pages/products/products.page";

class App extends Component {
  state = {
    is_hidden: false,
  };

  componentDidMount() {
    this.props.setCartItems([
      {
        item1: "first item",
      },
    ]);
  }

  render() {
    // console.log("this is app", this.state.is_hidden);

    return (
      <div className="App">
        <Router>
          <Header></Header>
          <div>
            <Switch>
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
