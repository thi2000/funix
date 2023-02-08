const Hotel = require("../model/hotel");
exports.gethotel = (req, res, next) => {
  Hotel.find()
    .then((hotel) => {
      res.send(hotel);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.gethotelId = (req, res, next) => {
  Hotel.findOne({ _id: req.params.id })
    .then((hotel) => {
      res.send(hotel);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postaddhotel = (req, res) => {
  const info = req.body.data;
  console.log(req.body.data);
  const data = {
    name: info.name,
    address: info.address,
    cheapestPrice: info.cheapestPrice,
    city: info.city,
    desc: info.desc,
    title: info.title,
    type: info.type,
    featured: info.featured,
    distance: info.distance,
    photos: info.photos.split(","),
    rooms: req.body.roomsid,
  };
  const hotel = new Hotel({ ...data });
  hotel.save();
};
exports.delhotel = (req, res) => {
  console.log(req.body.id);
  Hotel.deleteOne({ _id: req.body.id })
    .then(() => console.log("thanhcong"))
    .catch((err) => console.log(err));
};
