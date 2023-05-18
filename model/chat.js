const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema({
  content: [
    {
      id: {
        type: "String",
      },
      message: {
        type: "String",
      },
      is_admin: {
        type: "Boolean",
      },
    },
  ],
});
module.exports = mongoose.model("Chat", chatSchema);
