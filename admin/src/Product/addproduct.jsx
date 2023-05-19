import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Pro.css";

function Addproduct(props) {
  const [category, setcategory] = useState("");
  const [count, setcout] = useState("");
  const [img, setimg] = useState(null);

  const [name, setname] = useState("");
  const [price, setprice] = useState("");

  const [long_dec, setlong_dec] = useState("");
  const [short_dec, setshort_dec] = useState("");
  const [err, seterr] = useState("");
  const onChangeName = (e) => {
    setname(e.target.value);
  };
  const onChangeCount = (e) => {
    setcout(e.target.value);
  };
  const onChangecat = (e) => {
    setcategory(e.target.value);
  };
  const onChangeimg = (e) => {
    setimg(e.target.files);
  };
  const onChangeprice = (e) => {
    setprice(e.target.value);
  };
  const onChangelong = (e) => {
    setlong_dec(e.target.value);
  };
  const onChangeshort = (e) => {
    setshort_dec(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    if (img) {
      for (let i = 0; i < img.length; i++) {
        const imagies = img[i];
        data.append("img", imagies);
      }
      const info = {
        category: category,
        name: name,
        price: price,
        count: count,
        short_dec: short_dec,
        long_dec: long_dec,
      };
      data.append("info", JSON.stringify(info));
    }

    axios
      .post("http://localhost:5000/products", data)
      .then(function (response) {
        console.log(response);
        // window.location = "/";
      })
      .catch(function (err) {
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 501
        ) {
          seterr(err.response.data.message);
        }
      });

    if (err == "") {
      window.location = "/";
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div
          className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50"
          style={{ width: "1500px" }}
        >
          <span className="login100-form-title p-b-33">ADD Product</span>
          <div className="d-flex justify-content-center pb-5"></div>
          <div className="wrap-input101 validate-input">
            <input
              className="ipsmall"
              value={category}
              onChange={onChangecat}
              type="text"
              placeholder="category"
            />
          </div>

          <div className="wrap-input101 rs1 validate-input">
            <input
              className="ipsmall"
              value={name}
              onChange={onChangeName}
              type="text"
              placeholder="name"
            />
          </div>

          <div className="wrap-input101 rs1 validate-input">
            <input
              className="ipsmall"
              value={price}
              onChange={onChangeprice}
              type="number"
              placeholder="price"
            />
          </div>
          <div className="wrap-input101 rs1 validate-input">
            <input
              className="ipsmall"
              value={count}
              onChange={onChangeCount}
              type="number"
              placeholder="count"
            />
          </div>
          <div>
            <textarea
              style={{ border: "solid 1px black" }}
              rows="20"
              className="input101"
              value={short_dec}
              onChange={onChangeshort}
              type="text"
              placeholder="short_desc"
            />
          </div>
          <div>
            <textarea
              style={{ border: "solid 1px black" }}
              rows="20"
              className="input101"
              value={long_dec}
              onChange={onChangelong}
              type="text"
              placeholder="long_desc
              "
            />
          </div>
          <div className="wrap-input101 rs1 validate-input">
            <input multiple type="file" onChange={onChangeimg} />
          </div>

          <div className="container-login100-form-btn m-t-20">
            {/* {success && <Redirect to={"/signin"} />} */}
            {err && <h1>{err}</h1>}
            <button className="login100-form-btn" onClick={handlerSubmit}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Addproduct;
