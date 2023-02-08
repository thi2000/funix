const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  identityCardNumber: {
    type: String,
  },
  isAdmin: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);

const valiadate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    password: Joi.string().required().label("password"),
  });
  return schema.validate(data);
};
module.exports = { User, valiadate };
