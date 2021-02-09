import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { mapDispatchToProps } from "./redux/cart/cart-reducer";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Main from "./pages/main/main.page";
import "./App.css";

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
    console.log("this is app", this.state.is_hidden);

    return (
      <div className="App">
        <Header></Header>
        <Router>
          <div>
            <Switch>
              <Route path="/products">
                {/* <Users /> */}
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
