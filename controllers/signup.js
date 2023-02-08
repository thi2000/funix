const { User, valiadate } = require("../model/user");
exports.getuser = (req, res, next) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postadduser = async (req, res, next) => {
  try {
    const { error } = valiadate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ name: req.body.name });

    if (user) {
      return res.status(409).send({ message: "Tên Đã Tồn Tại " });
    }

    await new User({ ...req.body }).save();

    res.status(401).send({ message: "thanh cong" });
  } catch (error) {
    res.status(500).send({ message: "loi he thong" });
  }
};
