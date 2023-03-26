const User = require("../model/user");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const bcrypt = require("bcrypt");
const createtoken = (id, email, password) => {
  return jwt.sign({ id, email, password }, "test jwt token", {
    expiresIn: "3d",
  });
};
exports.postSignup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(201).send({ message: "user da ton tai" });
      } else {
        const user = new User({
          email: req.body.email,
          password: req.body.password,
          cart: {
            items: [],
          },
        });
        user.save();
        res.status(200).send({ message: "Success" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postLogin = (req, res, next) => {
  res.cookie("jwt", "token", {
    httpOnly: true,
    expires: new Date(Date.now() + 9000000),
  });
  User.findOne({ email: req.body.data.email })
    .then((user) => {
      if (!user) {
        res.status(201).send({ message: "wrong email" });
      }
      const validpassword = bcrypt.compare(
        req.body.data.password,
        user.password
      );

      if (!validpassword) {
        res.status(404).send({ message: "password fale" });
      }
      if (user && validpassword) {
        const token = createtoken(user._id, user.email, user.password);

        res.cookie("jwt", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 9000000),
        });

        res.status(200).send({ message: "success" });
      }
    })
    .catch((err) => {
      res.status(202).send({ message: "error" });
    });
};
