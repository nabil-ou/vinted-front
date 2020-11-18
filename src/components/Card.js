import React from "react";
import { Link } from "react-router-dom";

const Card = ({ offer }) => {
  return (
    <div className="card">
      <div className="card-user">
        {offer.owner.account.avatar && (
          <img src={offer.owner.account.avatar.secure_url} alt="" />
        )}
        <span> {offer.owner.account.username}</span>
      </div>
      <Link className="link" to={`/offer/${offer._id}`}>
        <div>
          <img src={offer.product_image.url} alt="" />
          <div className="product-infos">
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
