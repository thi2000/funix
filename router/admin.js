const path = require("path");
const { User, valiadate } = require("../model/user");
const express = require("express");
const router = express.Router();
const Usercontroll = require("../controllers/signup");
const Logincontroll = require("../controllers/login");
const Hotelcontroll = require("../controllers/hotel");
const Roomcontroll = require("../controllers/rooms");
const Transactioncontroll = require("../controllers/transaction");
router.get("/signup", Usercontroll.getuser);
router.post("/signup", Usercontroll.postadduser);

router.post("/login", Logincontroll.postlogin);
router.post("/loginadmin", Logincontroll.postloginadmin);
router.get("/", Hotelcontroll.gethotel);
router.get("/hotel:id", Hotelcontroll.gethotelId);
router.get("/rooms", Roomcontroll.getrooms);
router.post("/rooms", Roomcontroll.postaddrooms);
router.get("/transactions", Transactioncontroll.getTransaction);
router.get("/tran/:user", Transactioncontroll.getTransactionname);
router.post("/transactions", Transactioncontroll.postTransaction);
router.post("/", Hotelcontroll.postaddhotel);
router.post("/delhotel", Hotelcontroll.delhotel);
router.post("/delrooms", Roomcontroll.delrooms);
module.exports = router;
