import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Loader from "react-loader-spinner";

const Offer = ({ setPanier }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [offer, setOffer] = useState();

  const history = useHistory();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <Loader
      className="loader"
      type="ThreeDots"
      color="#2AAEB7"
      height={200}
      width={200}
    />
  ) : (
    <div className="offer">
      <div className="offer-container">
        <div className="offer-pictures">
          {offer.product_pictures.length > 0 ? (
            <Carousel>
              {offer.product_pictures.map((image, index) => {
                return (
                  <div key={index}>
                    <img className="offer-img" src={image.url} alt="" />
                  </div>
                );
              })}
            </Carousel>
          ) : (
            <img className="offer-img" src={offer.product_image.url} alt="" />
          )}
        </div>
        <div className="infos-offer">
          <div>
            <span className="offer-price"> {offer.product_price} €</span>
            <ul className="offer-detail">
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
            <div className="avatar-username">
              {offer.owner.account.avatar && (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt={offer.product_name}
                />
              )}
              <span> {offer.owner.account.username}</span>
            </div>
          </div>
          <button
            className="buy"
            onClick={() => {
              let assu = offer.product_price * 0.1;
              let fdp = offer.product_price * 0.2;
              let totalPrice = assu + fdp + offer.product_price;
              let panier = {
                price: offer.product_price,
                productName: offer.product_name,
                assu: assu,
                fdp: fdp,
                totalPrice: totalPrice,
              };
              history.push("/payment", panier);
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
