const express = require("express");

const router = express.Router();
const auth = require("../controllers/auth");
router.post("/signup", auth.postSignup);
router.post("/login", auth.postLogin);
// router.post("/login", function (req, res) {
//   res.cookie("name", "value", { httpOnly: true });
//   res.send("success");
// });

module.exports = router;
