const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomSchema = new Schema({
  title: { type: "string", required: true },
  price: { type: "number" },
  maxPeople: { type: "number" },
  desc: { type: "string", required: true },
  roomNumbers: { type: ["number"] },
  dateStart: { type: "string" },
  dateEnd: { type: "string" },
});
module.exports = mongoose.model("Room", roomSchema);
