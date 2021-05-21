import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import ProductSection from "./components/ProductSection/ProductSection";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import Users from "./components/Users/Users";
import { CssBaseline } from "@material-ui/core";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              <Navbar {...props} />
              <ProductSection {...props} />
              <Footer />
            </>
          )}
        />
        <Route path="/auth" exact render={(props) => <Login {...props} />} />
        <Route
          exact
          path="/product/:id"
          render={(props) => (
            <>
              <Navbar {...props} />
              <Product {...props} />
              <Footer />
            </>
          )}
        />
        <Route
          exact
          path="/users"
          render={(props) => (
            <>
              <Navbar {...props} />
              <Users {...props} />
              <Footer />
            </>
          )}
        />{" "}
        <Route
          exact
          path="/cart"
          render={(props) => (
            <>
              <Navbar {...props} />
              <Cart {...props} />
              <Footer />
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
