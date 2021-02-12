import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Main from "./pages/main/main.page";
import "./App.css";
import Products from "./pages/products/products.page";
import ProductPage from "./pages/product/product.page";

class App extends Component {
  state = {
    is_hidden: false,
  };

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

export default App;
