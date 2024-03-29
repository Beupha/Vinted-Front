import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

import "./CheckOutForm.css";

const CheckOutForm = ({ token, title, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://site--vinted-back--fzydy6yrfhrj.code.run/payment",
      {
        token: stripeToken,
        title: title,
        amount: totalPrice,
      }
    );
    console.log("response.data -->", response.data);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    } else {
      setErrorMessage(response.data.status);
      {
        errorMessage && <p className="errorPayment">{errorMessage}</p>;
      }
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <span>Paiement effectué!</span>
      )}
    </>
  );
};

export default CheckOutForm;
