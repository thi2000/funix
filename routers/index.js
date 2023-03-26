const path = require("path");
const express = require("express");

const router = express.Router();
const admin = require("../controllers/admin");
router.get("/admin/edit:id", admin.getEditProduct);
router.post("/admin/delete", admin.postDeleteProduct);
router.post("/admin", admin.postEditProduct);
router.post("/", admin.postAddProduct);

module.exports = router;
