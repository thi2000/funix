const { User, valiadate } = require("../model/user");

exports.postlogin = async (req, res, next) => {
  try {
    // console.log(User);
    const name = await User.findOne({ name: req.body.name });
    console.log(name);
    if (!name) {
      return res.status(401).send({ message: "Tên khong Tồn Tại " });
    }
    const pass = await User.findOne({ password: req.body.password });

    if (!pass) {
      return res.status(402).send({ message: "Mật Khẩu sai " });
    }
    res.status(200).send({ message: "dang nhap thanh cong " });
  } catch (err) {
    res.status(500).send({ message: "loi he thong " });
  }
};
exports.postloginadmin = async (req, res, next) => {
  try {
    // console.log(User);
    const name = await User.findOne({ name: req.body.name });

    if (!name) {
      return res.status(401).send({ message: "Tên khong Tồn Tại " });
    }
    const pass = await User.findOne({ password: req.body.password });

    if (!pass) {
      return res.status(402).send({ message: "Mật Khẩu sai " });
    }
    const admin = await User.findOne({ name: req.body.name, isAdmin: "True" });
    if (!admin) {
      return res.status(403).send({ message: "khong phai tai khoan admin " });
    }
    res.status(200).send({ message: "dang nhap thanh cong " });
  } catch (err) {
    res.status(500).send({ message: "loi he thong " });
  }
};
