import React from "react";
import { Link } from "react-router-dom";

const Card = ({ offer }) => {
  return (
    <div className="card-container">
      <div className="card-avatar-username">
        <img src={offer.owner.account.avatar.url} alt="" />
        <span> {offer.owner.account.username}</span>
      </div>
      <Link className="link" to={`/offer/${offer._id}`}>
        <div>
          <img src={offer.product_image.url} alt="" />
          <div className="card-price-size-brand">
            <span>{offer.product_price} €</span>
            <span> {offer.product_details[1].TAILLE} </span>
            <span>{offer.product_details[0].MARQUE}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
