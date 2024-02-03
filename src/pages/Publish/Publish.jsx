import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Publish.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [image, setImage] = useState(null);
  const [images, setImages] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (title && price && description) {
        // FormData pour envoyer les fichiers via une requête

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("image", image);

        // pour visualiser le contenu de notre formData : (boucle for of)
        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        // Pour insérer plusieurs photos à la même clé du formData
        // for (const key in images) {
        //   if (Object.hasOwnProperty.call(images, key)) {
        //     formData.append("images", images[key]);
        //   }
        // }

        const { data } = await axios.post(
          "https://site--vinted-back--fzydy6yrfhrj.code.run/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("data>>>", data);
        navigate("/");
      } else {
        setErrorMessage(
          "Veuillez mettre au minimum un titre, une description et un prix"
        );
      }
    } catch (error) {
      console.log("catch>>>'", error.response);
    }
  };

  return (
    <main>
      <h1>Poster une annonce</h1>

      <form onSubmit={handleSubmit}>
        {/* Pour styliser le sélecteur de fichiers = > faire disparaitre l'input via le CSS, puis styliser le 'label' */}
        <label>
          Titre de l'annonce :
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => {
              setErrorMessage("");
              setTitle(event.target.value);
            }}
          />
        </label>

        <label>
          Prix :
          <input
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(event) => {
              setErrorMessage("");
              setPrice(event.target.value);
            }}
          />
        </label>

        <label>
          Etat :
          <input
            type="text"
            name="condition"
            id="condition"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
        </label>

        <label>
          Localisation :
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </label>

        <label>
          Marque :
          <input
            type="text"
            name="brand"
            id="brand"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
        </label>

        <label>
          Taille :
          <input
            type="text"
            name="size"
            id="size"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
        </label>

        <label>
          Couleur :
          <input
            type="text"
            name="color"
            id="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </label>

        <label>
          Description :
          <input
            className="description"
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(event) => {
              setErrorMessage("");
              setDescription(event.target.value);
            }}
          />
        </label>

        <label>
          Image :
          <input
            type="file"
            name="image"
            id="image"
            onChange={(event) => {
              // console.log(event.target.files);
              setImage(event.target.files[0]);
            }}
          />
        </label>

        {/* -- Affichage d'une preview de l'image avant de faire la requête */}
        {image && <img src={URL.createObjectURL(image)} alt="" />}

        {/* <label>
          Plusieurs images :
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={(event) => {
              console.log(event.target.files);
              setImages(event.target.files);
            }}
          />
        </label> */}

        <button className="send">Envoyer</button>
        {errorMessage && <p className="errorOffer">{errorMessage}</p>}
      </form>
    </main>
  );
}

export default App;
