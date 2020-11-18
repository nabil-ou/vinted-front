import React, { useState } from "react";
import "./App.css";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";
library.add(faSearch);

function App() {
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const [panier, setPanier] = useState({});
  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      Cookie.set("userToken", tokenToSet);
      setToken(tokenToSet);
    } else {
      Cookie.remove("userToken");

      setToken(null);
    }
  };

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Switch>
          <Route path="/offer/:id">
            <Offer setPanier={setPanier} />
          </Route>
          <Route path="/payment">
            {!token ? (
              <Redirect to="/login" />
            ) : (
              <Payment panier={panier} token={token} />
            )}
          </Route>
          <Route path="/publish">
            {!token ? <Redirect to="/login" /> : <Publish token={token} />}
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
