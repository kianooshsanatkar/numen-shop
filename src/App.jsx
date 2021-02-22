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
import Profile from "./pages/profile/profile.page";
import EditableProfile from "./pages/profile-editable/profile-editable.page";
import CartCheckPage from "./pages/cart-check";
import { isLoggedIn } from "./services/auth";

class App extends Component {
  state = {
    is_hidden: false,
  };

  componentDidMount() {
    isLoggedIn().then((result) => {
      const [logged, user] = result;
      if (logged === true) this.props.login(user);
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>
          <div style={{ paddingTop: "70px" }}>
            <Switch>
              <Route exact path="/profile/edit/">
                <CartCheckPage />
              </Route>
              <Route exact path="/profile/edit/">
                <EditableProfile
                  getUserUrl="/api/user/"
                  sendDataUrl="/api/user/"
                />
              </Route>
              <Route exact path="/profile/">
                <Profile getUserUrl="/api/user/" />
              </Route>
              <Route exact path="/product/:productId">
                <ProductPage></ProductPage>
              </Route>
              <Route exact path="/products/:labelId">
                <Products />
              </Route>
              <Route exact path="/profile/">
                <Profile />
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
