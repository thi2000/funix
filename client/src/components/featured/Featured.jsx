import "./featured.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Featured = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        // console.log(res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const countholtel = (name) => {
    // console.log(data);
    const a = data.filter((e) => e.city === name);

    return a;
  };

  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="./images/Ha Noi.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ha Noi</h1>
          <h2>{countholtel("Ha Noi").length}</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="./images/HCM.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ho Chi Minh</h1>
          <h2>{countholtel("Ho Chi Minh").length}</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="./images/Da Nang.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Da Nang</h1>
          <h2>{countholtel("Da Nang").length}</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
