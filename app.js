const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const path = require("path");
const sequelize = require("./ultil/database");
const Product = require("./model/product");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/cart-item");
const Order = require("./model/order");
const OrderItem = require("./model/order-item");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use((req, res, next) => {
  User.findById("6410adec514245cc8c27fbf1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(logger("dev"));
app.use(express.json());
app.use(cookieparser());
const indexRouter = require("./routers/index");
const userRouter = require("./routers/shop");
const authRouter = require("./routers/auth");
app.use(indexRouter);
app.use(userRouter);
app.use(authRouter);

mongoose
  .connect("mongodb+srv://dinhthi:03042000thi@cluster0.vhklay1.mongodb.net/lab")
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          email: "max@test.com",
          password: "1234",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
