import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import OfferPage from "./pages/OfferPage/OfferPage";
import Header from "./assets/components/Header";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import ModalConnect from "./assets/components/ModalConnect";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [displayModalConnect, setDisplayModalConnect] = useState(false);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route
            path="/signUp"
            element={
              <SignUp
                setToken={setToken}
                setDisplayModalConnect={setDisplayModalConnect}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setToken={setToken}
                setDisplayModalConnect={setDisplayModalConnect}
              />
            }
          />
        </Routes>

        {displayModalConnect && (
          <ModalConnect setDisplayModalConnect={setDisplayModalConnect} />
        )}
      </Router>
    </>
  );
}

export default App;
