import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

const Payment = () => {
  const location = useLocation();
  const panier = location.state;
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm panier={panier} />
    </Elements>
  );
};

export default Payment;
