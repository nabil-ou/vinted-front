import React from "react";
import Logo from "./logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/">
        <div>
          <img className="header-logo" alt="logo" src={Logo} />
        </div>
      </Link>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher des articles"
        />
      </div>
      <div>
        <button className="header-button button-login-signup button-signup">
          S'inscrire
        </button>
        <button className="header-button button-login-signup">
          Se connecter
        </button>
      </div>
      <button className="header-button button-sold">Vends tes articles</button>
    </div>
  );
};

export default Header;
