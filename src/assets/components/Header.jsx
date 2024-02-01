import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  function handleClick() {
    token ? navigate("/Publish") : navigate("/SignUp");
  }

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

        <button onClick={handleClick}>Poster une annonce</button>
      </div>
    </>
  );
}

{
  /* <Link to="/publish">Poster une annonce</Link> */
}
