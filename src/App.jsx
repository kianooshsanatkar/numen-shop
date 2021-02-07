import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";

import { mapDispatchToProps } from "./redux/cart/cart-reducer";
import Header from "./components/header/header.component";
import Main from "./pages/main/main.page";

class App extends Component {

  state={
    is_hidden: false
  }

  componentDidMount(){
    this.props.setCartItems([{
      item1: "first item",
    }]);
  }

  render() {
    console.log("this is app", this.state.is_hidden);

    return (
      <div className="App">
        <Header></Header>
        <Main></Main>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
