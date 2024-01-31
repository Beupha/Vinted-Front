import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ModalConnect({ setDisplayModalConnect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    console.log(email, password);
    setDisplayModalConnect(false);
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
  };

  return (
    <div
      className="modalConnect"
      onClick={() => {
        // -- Pour fermer la modale en cliquant à l'extérieur de la partie blanche
        setDisplayModalConnect(false);
      }}
    >
      <div
        onClick={(event) => {
          // -- Pour éviter qu'un clic sur la partie blanche ferme la modale
          event.stopPropagation();
        }}
      >
        <h2>Se connecter</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input type="submit" value="Se Connecter" />
        </form>

        <Link
          to="/signup"
          className="link"
          onClick={() => {
            setDisplayModalConnect(false);
          }}
        >
          Pas encore de compte ? Inscrivez-vous !
        </Link>
      </div>
    </div>
  );
}
