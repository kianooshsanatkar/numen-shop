import React, { Component } from "react";
import "./App.css";

import { connect } from "react-redux";
import { mapDispatchToProps } from "./redux/cart/cart-reducer";
import Header from "./components/header/header.component";

class App extends Component {

  componentDidMount(){
    console.log('app component did mount');
    this.props.setCartItems({
      item1: "first item",
    });
  }

  render() {
    console.log("this is app");
    return (
      <div className="App">
        <Header></Header>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
