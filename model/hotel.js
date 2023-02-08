const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
  name: {
    type: "string",
    required: true,
  },
  type: {
    type: "string",
  },
  city: { type: "string", required: true },
  address: { type: "string" },
  distance: { type: "number" },
  photos: { type: ["string"] },
  desc: { type: "string" },
  rating: { type: "number" },
  featured: { type: "string" },
  rooms: { type: ["string"] },
});
module.exports = mongoose.model("Hotel", hotelSchema);
