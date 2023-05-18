const express = require("express");
const router = express.Router();
const chatcontroller = require("../controller/chat");
router.post("/chatrooms/createNewRoom", chatcontroller.createnewroom);
router.put("/chatrooms/addMessage", chatcontroller.addmessage);
module.exports = router;
