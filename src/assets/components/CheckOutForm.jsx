import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

import "./CheckOutForm.css";

const CheckOutForm = ({ token, title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripePromise = loadStripe(
      "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
    );
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: "Moi",
    });
    console.log("stripeResponse -->", stripeResponse);

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      { token: stripeToken, title: title, amount: price }
    );
    console.log("response.data=", response.data);

    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Pay</button>
        </form>
      ) : (
        <span>Paiement effectué!</span>
      )}
    </>
  );
};

export default CheckOutForm;
