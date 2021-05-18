import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {ThemeProvider} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';

import { saveUserStateAction } from "./redux/user.reducer";
import { isLoggedIn } from "./services/auth";
import "./App.css";

import Main from "./pages/main/main.page";
import Products from "./pages/products/products.page";
import ProductPage from "./pages/product/product.page";
import Profile from "./pages/profile/profile.page";
import EditableProfile from "./pages/profile-editable/profile-editable.page";
import CartPage from "./pages/cart";
import Register from "./pages/registration/registration.page";
import BillPage from './pages/bill/bill.page';
import InvoicePage from './pages/invoice/invoice.page';

import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";


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
      const [loggedIn, user] = result;
      if (loggedIn === true) dispatch(saveUserStateAction(user));
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
            <Route exact path="/bill/">
              <BillPage />
            </Route>
            <Route exact path="/invoice/:invoiceId">
              <InvoicePage />
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
