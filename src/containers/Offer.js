import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [offer, setOffer] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
      );
      setOffer(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div className="offer-body">
      <div className="offer-container">
        <div className="offer-pictures">
          <Carousel>
            {offer.product_pictures.map((image, index) => {
              return (
                <div key={index}>
                  <img className="offer-picture" src={image.url} alt="" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="offer-infos">
          <div>
            <span className="offer-price"> {offer.product_price} €</span>
            <ul className="offer-list">
              {offer.product_details.map((detail, index) => {
                const key = Object.keys(detail);
                return (
                  <li key={index}>
                    <span>{key} </span>
                    <span>{detail[key]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="divider"></div>
          <div className="offer-content">
            <p className="name">{offer.product_name}</p>
            <p className="description">{offer.product_description}</p>
            <div className="offer-avatar-username">
              <img
                src={offer.owner.account.avatar.url}
                alt={offer.product_name}
              />
              <span> {offer.owner.account.username}</span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
