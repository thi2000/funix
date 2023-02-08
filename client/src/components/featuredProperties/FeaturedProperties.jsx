import "./featuredProperties.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedProperties = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    await axios
      .get("http://localhost:5000/")
      .then((res) => {
        // console.log(res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const featured = () => {
    const a = data.filter((e) => e.featured === "true");

    return a;
  };
  if (featured()[0]) {
    return (
      <div className="fp">
        <div className="fpItem">
          <img
            src={`${featured()[0] ? featured()[0].photos[0] : ""}`}
            alt=""
            className="fpImg"
          />
          <span className="fpName">
            <Link to={`./hotels/${featured()[0]._id}`} className="text ">
              Aparthotel Stare Miasto
            </Link>
          </span>
          <span className="fpCity">
            {featured()[0] ? featured()[0].city : ""}
          </span>
          <span className="fpPrice">
            Starting from {featured()[0] ? featured()[0].cheapestPrice : ""}
          </span>
          <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src={`${featured()[1] ? featured()[1].photos[0] : ""}`}
            alt=""
            className="fpImg"
          />
          <span className="fpName">
            <Link to={`./hotels/${featured()[1]._id}`} className="text ">
              Comfort Suites Airport
            </Link>
          </span>
          <span className="fpCity">
            {featured()[0] ? featured()[1].city : ""}
          </span>
          <span className="fpPrice">
            Starting from {featured()[0] ? featured()[1].cheapestPrice : ""}
          </span>
          <div className="fpRating">
            <button>9.3</button>
            <span>Exceptional</span>
          </div>
        </div>
        <div className="fpItem">
          <img
            src={`${featured()[2] ? featured()[2].photos[3] : ""}`}
            alt=""
            className="fpImg"
          />
          <span className="fpName">
            <Link to={`./hotels/${featured()[0]._id}`} className="text ">
              Four Seasons Hotel
            </Link>
          </span>
          <span className="fpCity">
            {featured()[0] ? featured()[2].city : ""}
          </span>
          <span className="fpPrice">
            Starting from {featured()[0] ? featured()[2].cheapestPrice : ""}
          </span>
          <div className="fpRating">
            <button>8.8</button>
            <span>Excellent</span>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default FeaturedProperties;
