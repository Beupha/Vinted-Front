import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./OfferPage.css";

export default function OfferPage() {
  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // -- Récupération de l'id
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log("Offerpage - datat>>", data);

        setOffer(data);
      } catch (error) {
        console.log("OfferPAge - catch >>", error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className="offerPage">
      <div>
        <img src={offer.product_image.secure_url} alt="" />

        <div>
          <p className="price">{offer.product_price} €</p>

          <div>
            {offer.product_details.map((detail) => {
              // console.log("Offerpage - Map>>", detail);

              // -- Utilisation de 'Object.keys' pour récupérer le nom de la clé puis pouvoir l'afficher et afficher sa valeur
              const keyTab = Object.keys(detail);
              return (
                <div>
                  <p className="detail">
                    {keyTab[0]} : {detail[keyTab[0]]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
