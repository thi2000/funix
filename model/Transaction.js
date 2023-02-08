const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tranSchema = new Schema({
  user: { type: "string", required: true },
  hotel: { type: "string", required: true },
  rooms: { type: ["number"] },
  startDate: { type: "date" },
  dateEnd: { type: "date" },
  price: { type: "number" },
  payment: { type: "string", required: true },
  status: { type: "string" },
});
module.exports = mongoose.model("Transaction", tranSchema);
