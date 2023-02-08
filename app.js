const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
// const cors = require("cors");
const mongoose = require("mongoose");
const signup = require("./router/admin");
app.use(signup);
mongoose
  .connect(
    "mongodb+srv://dinhthi:03042000thi@cluster0.vhklay1.mongodb.net/Asm2"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
