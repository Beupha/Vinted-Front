import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setOffersList(response.data.offers);
      } catch (error) {
        console.log("HomePage - catch>>", error.response);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="homePage">
      <div>
        {offersList.map((offer) => {
          return (
            <Link
              to={`/offer/${offer._id}`}
              key={offer._id}
              className="offerCard"
            >
              <div className="avatarAndName">
                {offer.owner.account.avatar && (
                  <img src={offer.owner.account.avatar.secure_url} alt="" />
                )}
                <span className="accountName">
                  {offer.owner.account.username}
                </span>
              </div>

              <img src={offer.product_image.secure_url} alt="" />

              <p className="price">
                {offer.product_price.toFixed(2).toString().replace(".", ",")} €
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
