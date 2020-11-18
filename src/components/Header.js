import React from "react";
import Logo from "./logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setUser }) => {
  return (
    <div className="header">
      <Link className="link" to="/">
        <div>
          <img className="logo" alt="logo" src={Logo} />
        </div>
      </Link>
      <div className="search-bar">
        <FontAwesomeIcon icon="search" className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher des articles"
        />
      </div>
      {!token ? (
        <div>
          <Link to="/signup">
            <button className="button-header button-login-signup ">
              S'inscrire
            </button>
          </Link>
          <Link to="/login">
            <button className="button-header button-login-signup">
              Se connecter
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <button
            className="button-header button-logout"
            onClick={() => {
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        </div>
      )}
      <Link to="/publish">
        <button className="button-sell">Vends tes articles</button>
      </Link>
    </div>
  );
};

export default Header;
