const express = require("express");
const productcontroller = require("../controller/product");
const router = express.Router();

router.get("/products", productcontroller.getProduct);
router.get("/info/:id", productcontroller.getUser);
router.get("/products/:id", productcontroller.getProductid);
router.get("/pagination", productcontroller.getpagination);
router.get("/carts", productcontroller.getOrder);
router.post("/carts/delete", productcontroller.deleteCart);
router.post("/carts/add", productcontroller.postAddToCart);
router.post("/carts/deleteall", productcontroller.deleteOrder);
router.post("/email", productcontroller.postEmail);
router.post("/products", productcontroller.postaddProduct);
router.post("/products/del", productcontroller.deleteProduct);
router.post("/update", productcontroller.update);
router.get("/histories", productcontroller.gethistory);
router.get("/histories/:id", productcontroller.getDetail);

module.exports = router;
