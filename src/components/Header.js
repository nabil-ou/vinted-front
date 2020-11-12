import React from "react";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setUser }) => {
  return (
    <div className="header-container">
      <Link className="link" to="/">
        <div>
          <img className="header-logo" alt="logo" src={Logo} />
        </div>
      </Link>
      <div className="search-container">
        <FontAwesomeIcon icon="search" className="search-input-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher des articles"
        />
      </div>
      {!token ? (
        <div>
          <Link to="/signup">
            <button className="header-button button-login-signup button-signup">
              S'inscrire
            </button>
          </Link>
          <Link to="/login">
            <button className="header-button button-login-signup">
              Se connecter
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <button
            className="header-button button-logout"
            onClick={() => {
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        </div>
      )}
      <Link to={!token ? "/login" : "/"}>
        <button className="header-button button-sold">
          Vends tes articles
        </button>
      </Link>
    </div>
  );
};

export default Header;
