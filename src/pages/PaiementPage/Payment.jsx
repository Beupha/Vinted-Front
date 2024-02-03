import "./Payment.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";

import CheckOutForm from "../../assets/components/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51Ofiz3KFr646Y3mJKDqatKtYbKlKWc4QiJD9y2TmNr9IqeNwba1dT5j1Xc07s4NR0E8K7XYBCiXlxKySOyolAWwN00kI80ErZv"
);

function Payment({ token }) {
  const location = useLocation();
  const { title, price } = location.state;

  const shippingFees = 5;
  const totalPrice = price + shippingFees;

  if (stripePromise) {
    return token ? (
      <div className="payment">
        <div className="payment-container">
          <h1>Valider votre commande</h1>

          <p>Nom de l'annonce : {title}</p>
          <p>Prix de l'objet : {price}€</p>
          <p>Frais de port :{shippingFees}€</p>
          <p className="priceTotal">TOTAL :{totalPrice}€</p>

          <Elements stripe={stripePromise}>
            {<CheckOutForm token={token} title={title} price={totalPrice} />}
          </Elements>
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    );
  }
}

export default Payment;
