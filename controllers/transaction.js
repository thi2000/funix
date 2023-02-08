const Transaction = require("../model/Transaction");
const { User, valiadate } = require("../model/user");
exports.getTransaction = (req, res, next) => {
  let day = new Date().getDate();
  let mm = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const test = "2020-09-27";
  if (mm < 10) mm = "0" + mm;
  if (day < 10) day = "0" + day;

  const date = `${year}-${mm}-${day}`;
  const today = new Date(date);
  Transaction.updateMany(
    {
      startDate: {
        $lt: today,
      },
    },
    {
      $set: {
        status: "checkout",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.updateMany(
    {
      startDate: {
        $eq: today,
      },
    },
    {
      $set: {
        status: "booked",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.updateMany(
    {
      startDate: {
        $gt: today,
      },
    },
    {
      $set: {
        status: "checkin",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.find()
    .then((tran) => res.send(tran))
    .catch((err) => console.log(err));
};
exports.postTransaction = (req, res, next) => {
  const data = req.body.data;
  console.log(req.body.data);
  const transaction = new Transaction({ ...req.body.transaction });

  transaction.save();
  User.updateOne(
    { name: req.body.transaction.user },
    {
      fullname: data.fullname,
      phoneNumber: data.phoneNumber,
      email: data.email,
      identityCardNumber: data.identityCardNumber,
    }
  )
    .then((e) => console.log("thanhcong"))
    .catch((err) => console.log(err));
};

exports.getTransactionname = (req, res, next) => {
  let day = new Date().getDate();
  let mm = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const test = "2020-09-27";
  if (mm < 10) mm = "0" + mm;
  if (day < 10) day = "0" + day;

  const date = `${year}-${mm}-${day}`;
  const today = new Date(date);
  Transaction.updateMany(
    {
      startDate: {
        $lt: today,
      },
    },
    {
      $set: {
        status: "checkout",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.updateMany(
    {
      startDate: {
        $eq: today,
      },
    },
    {
      $set: {
        status: "booked",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.updateMany(
    {
      startDate: {
        $gt: today,
      },
    },
    {
      $set: {
        status: "checkin",
      },
    }
  )
    .then((e) => {})
    .catch((err) => console.log(err));
  Transaction.find({ user: req.params.user })
    .then((tran) => res.send(tran))
    .catch((err) => console.log(err));
};
