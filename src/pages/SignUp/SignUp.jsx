import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "./SignUp.css";

export default function SignupPage({ setToken, setDisplayModalConnect }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (username && email && password) {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            username,
            email,
            password,
            newsletter,
          }
        );

        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("Signpage error ->", error.response);
    }
  };

  return (
    <main className="signupPage">
      <h1>S'inscrire</h1>

      <form onSubmit={handleSubmit} className="formSignUp">
        <input
          type="text"
          name="usesername"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setErrorMessage("");
            setUsername(event.target.value);
          }}
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setErrorMessage("");
            setEmail(event.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setErrorMessage("");
            setPassword(event.target.value);
          }}
        />
        <div className="newsletter">
          <label htmlFor="newsletter">S'inscrire à la newsletter</label>
          <input
            className="checkbox"
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={newsletter}
            onChange={(event) => {
              setErrorMessage("");
              setNewsletter(!newsletter);
            }}
          />
        </div>

        <button className="buttonInscrire">S'inscrire</button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>

      <p
        className="modal"
        onClick={() => {
          setDisplayModalConnect(true);
        }}
      >
        Déjà un compte ? Connectez-vous !
      </p>
    </main>
  );
}
