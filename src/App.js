import React, { useState } from "react";
import "./App.css";
import Cookie from "js-cookie";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  // Tout ce qui concerne l'authentification se passe dans App.js
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const setUser = (tokenToSet) => {
    if (tokenToSet) {
      // Créer un cookie
      Cookie.set("userToken", tokenToSet);
      setToken(tokenToSet);
    } else {
      // Supprimer le cookie
      Cookie.remove("userToken");
      // Repasser le state token à null
      setToken(null);
    }
  };

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Switch>
          <Route path="/offer/:id">
            <Offer />
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
