import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProductSection from "./components/ProductSection/ProductSection";

const App = () => {
  return (
    <Router>
      <Switch>
        <>
          <Navbar />
          <ProductSection />
        </>
        <Route />
      </Switch>
    </Router>
  );
};

export default App;
