import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import Main from "./pages/main/main.page";
import Products from "./pages/products/products.page";
import ProductPage from "./pages/product/product.page";
import { saveUserStateAction } from "./redux/user.reducer";
import "./App.css";
import Profile from "./pages/profile/profile.page";
import EditableProfile from "./pages/profile-editable/profile-editable.page";
import CartPage from "./pages/cart";
import { isLoggedIn } from "./services/auth";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/core';
import Register from "./pages/registration/registration.page";

const theme = createMuiTheme({
  typography:{
    fontFamily: "BYekan"
  }
});

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  if (!user) {
    isLoggedIn().then((result) => {
      const [logged, user] = result;
      if (logged === true) dispatch(saveUserStateAction(user));
    });
  }

  return (
    <ThemeProvider theme={theme}>
    <div className='' >
      <Router>
        <Header />
        <div style={{ paddingTop: "70px" }}>
          <Switch>
            <Route exact path="/profile/edit/">
              <EditableProfile
                getUserUrl="/api/user/"
                sendDataUrl="/api/user/"
              />
            </Route>
            <Route exact path="/profile/">
              <Profile getUserUrl="/api/user/" />
            </Route>
            <Route exact path="/registration/">
              <Register />
            </Route>
            <Route exact path="/product/:productId">
              <ProductPage />
            </Route>
            <Route exact path="/products/:labelId">
              <Products />
            </Route>
            <Route exact path="/cart/">
              <CartPage />
            </Route>
            <Route exact path="/profile/">
              <Profile />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
    </ThemeProvider>
  );
}

// export default connect(null, mapDispatchToProps)(App2);
