import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({ token, setToken }) {
  return (
    <>
      <div className="header">
        <Link to="/">
          <p>VINTED</p>
        </Link>
        <p>Search</p>

        <nav className="headerDetail">
          {token ? (
            <button
              onClick={() => {
                Cookies.remove("userToken");
                setToken("");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <div className="headerDetail">
                <Link to="/signup">S'inscrire </Link>
              </div>
              <div className="headerDetail">
                <Link to="/login">Se connecter</Link>
              </div>
            </>
          )}
        </nav>

        <button>Poster une annonce</button>
      </div>
    </>
  );
}
