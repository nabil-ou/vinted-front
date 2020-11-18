import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ panier }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,

          title: panier.productName,
          amount: panier.totalPrice,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <div className="payment-card">
          <div className="title">Résumé de la commande</div>
          <div className="content">
            <ul>
              <li>
                Commande
                <span>{panier.price.toFixed(2)} €</span>
              </li>
              <li>
                Frais protection acheteurs
                <span>{panier.assu.toFixed(2)} €</span>
              </li>
              <li>
                Frais de port
                <span>{panier.fdp.toFixed(2)} €</span>
              </li>
            </ul>
          </div>
          <div className="divider"></div>
          <div className="content">
            <ul>
              <li className="bold">
                Total <span>{panier.totalPrice.toFixed(2)} €</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'un étape pour vous offrir
            <span class="bold"> {panier.productName} </span>
            Vous allez payer
            <span class="bold"> {panier.totalPrice.toFixed(2)} € </span>
            (frais de protection et frais de port inclus).
            <div className="divider"></div>
            <div className="StripeElement StripeElement--empty">
              {!completed ? (
                <form onSubmit={handleSubmit}>
                  <CardElement />
                  <button type="submit">Valider</button>
                </form>
              ) : (
                <span>Paiement effectué ! </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutForm;
