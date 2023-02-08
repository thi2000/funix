const Rooms = require("../model/room");
exports.getrooms = (req, res, next) => {
  Rooms.find()
    .then((room) => {
      res.send(room);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postaddrooms = (req, res, next) => {
  const data = req.body.data;
  const roomNumbers = data.roomNumber.split(",").map((e) => {
    return Number(e);
  });

  const room = {
    desc: data.desc,
    title: data.title,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    roomNumbers: roomNumbers,
    price: data.price,
    maxPeople: data.maxPeople,
  };
  console.log(room);
  const rooms = new Rooms({ ...room });
  rooms.save();
};
exports.delrooms = (req, res) => {
  console.log("dat la", req.body.id);
  Rooms.deleteOne({ _id: req.body.id })
    .then(() => {
      console.log("thanhcong");
    })
    .catch((err) => {
      console.log(err);
    });
};
