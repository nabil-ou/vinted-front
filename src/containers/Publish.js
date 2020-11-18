import React, { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [preview, setPreview] = useState();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("picture", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="publish">
      <div className="publish-container">
        <h2 className="publish-title">Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select">
            {preview ? (
              <div className="preview-image">
                <img src={preview} alt="preview" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="preview-without">
                <div className="input-design-default">
                  <label for="file" class="label-file">
                    <span class="input-sign"> + </span>
                    <span>Ajoute une photo</span>
                  </label>

                  <input
                    id="file"
                    type="file"
                    className="input-file"
                    multiple={true}
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="text-input-section">
            <div className="text-input">
              <h4>Titre</h4>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <h4>Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Marque</h4>
              <input
                type="text"
                id="Brand"
                name="Brand"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              ></input>
            </div>
            <div className="text-input">
              <h4>Taille</h4>
              <input
                type="text"
                id="Size"
                name="Size"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              ></input>
            </div>
            <div className="text-input">
              <h4>Couleur</h4>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              ></input>
            </div>
            <div className="text-input">
              <h4>Etat</h4>
              <input
                name="condition"
                id="condition"
                placeholder="Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              ></input>
            </div>
            <div className="text-input">
              <h4>Lieu</h4>
              <input
                name="city"
                id="city"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              ></input>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4>Prix</h4>
              <div className="checkbox-section">
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setPrice(parseInt(event.target.value));
                  }}
                />
                <div className="checkbox-input">
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    value="exchange"
                  />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" class="form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Publish;
