import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";

import CheckOutForm from "../../assets/components/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51Ofiz3KFr646Y3mJKDqatKtYbKlKWc4QiJD9y2TmNr9IqeNwba1dT5j1Xc07s4NR0E8K7XYBCiXlxKySOyolAWwN00kI80ErZv"
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
  );
}

export default App;
