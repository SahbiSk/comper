import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import ProductSection from "./components/ProductSection/ProductSection";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
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
      </Switch>
      <Redirect to="/" />
    </Router>
  );
};

export default App;
