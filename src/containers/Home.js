import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Dechire from "../dechire.svg";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loader
      className="home-loader"
      type="ThreeDots"
      color="#2AAEB7"
      height={200}
      width={200}
    />
  ) : (
    <div>
      <div className="home-hero-bg-img">
        <img src={Dechire} alt="forme" className="home-hero-forme" />
        <div>
          <div className="home-hero-ready">
            Prêts à faire du tri dans vos placards ?
            <Link to="/login">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="home-card-wrapper">
        {data.offers.map((offer, index) => {
          return <Card key={index} offer={offer} />;
        })}
      </div>
    </div>
  );
};

export default Home;
