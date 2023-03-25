const express = require("express");

const router = express.Router();
const shop = require("../controllers/shop");

router.get("/", shop.getProduct);
router.get("/cookie", function (req, res) {
  res.cookie("cookieName", "cookieValue");
});
router.post("/cart", shop.postCart);
router.get("/cart", shop.getCart);
router.post("/order", shop.postOrder);
router.get("/order", shop.getOrders);

module.exports = router;
