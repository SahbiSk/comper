import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
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
              <Navbar />
              <ProductSection {...props} />
              <Footer />
            </>
          )}
        />
        <Route path="/auth" exact render={(props) => <Login {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
