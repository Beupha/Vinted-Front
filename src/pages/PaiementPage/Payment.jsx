import "./Payment.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";

import CheckOutForm from "../../assets/components/CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function Payment({ token }) {
  const location = useLocation();
  const { title, price } = location.state;

  const shippingFees = 5;
  const totalPrice = price + shippingFees;

  return token ? (
    <div className="payment">
      <div className="payment-container">
        <h1>Valider votre commande</h1>

        <p>Nom de l'annonce : {title}</p>
        <p>Prix de l'objet : {price}€</p>
        <p>Frais de port :{shippingFees}€</p>
        <p className="priceTotal">TOTAL :{totalPrice}€</p>

        <Elements stripe={stripePromise}>
          {<CheckOutForm token={token} title={title} price={price} />}
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default Payment;
