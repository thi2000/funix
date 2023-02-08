import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    password: "",
  });
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(
        "http://localhost:5000/signup",
        data
      );
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        seterror(err.response.data.message);
      }
    }
  };
  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.name] = e.target.value;
    setdata(newdata);
  };

  return (
    <div>
      <Navbar />
      <React.Fragment>
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <input
            onChange={handle}
            id="name"
            className="item"
            type="text"
            name="name"
            value={data.name}
            required
          />
          <input
            onChange={handle}
            id="password"
            className="item"
            type="password"
            name="password"
            value={data.password}
            required
          />
          {error && <div>{error}</div>}
          <button className="btn">Creat Accout</button>
        </form>
      </React.Fragment>
    </div>
  );
};
export default Signup;
