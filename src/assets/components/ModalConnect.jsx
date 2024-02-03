import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ModalConnect({ setDisplayModalConnect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    setDisplayModalConnect(false);
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire

    try {
      if (email && password) {
        const { data } = await axios.post(
          "https://site--vinted-back--fzydy6yrfhrj.code.run/user/login",
          {
            email,
            password,
          }
        );

        Cookies.set("userToken", data.token, { secure: true });
        setToken(data.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      setErrorPassword("Accès refusé, veuillez réessayer");
      console.log("error.response->", error.response);
    }
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
            className="inputModal"
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="inputModal"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <input type="submit" value="Se Connecter" />
        </form>
        {/* {errorMessage && <p>{errorMessage}</p>}
        <div className="errorPassword">
          {errorPassword && <p>{errorPassword}</p>}
        </div> */}
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
