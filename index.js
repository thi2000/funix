const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const multer = require("multer");
const cors = require("cors");
const authRoutes = require("./router/auth");
const productRoutes = require("./router/product");
const adminRouters = require("./router/admin");
const chatRoutes = require("./router/chat");
const cookieparser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const urlmongo =
  "mongodb+srv://dinhthi:03042000thi@cluster0.vhklay1.mongodb.net/data";
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

    credentials: true,
  })
);
// const io =
app.use(express.json());
app.use(cookieparser());
app.use(upload.array("img", 4));
app.set("trust proxy", true);

app.use(express.json());
app.use(authRoutes);
app.use(chatRoutes);
app.use(productRoutes);
app.use(adminRouters);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(orderRoutes);

mongoose
  .connect(urlmongo)
  .then((result) => {
    const server = app.listen(5000);
    const io = require("./socket").init(server);
    io.on("connection", (connection) => {
      console.log("connection thanh cong");
    });
  })
  .catch((err) => {
    console.log(err);
  });
