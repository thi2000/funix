const io = require("../socket");
const Chat = require("../model/chat");
exports.addmessage = (req, res) => {
  console.log("a");
  // chèn các doạn chat tiêp theo
  //   console.log(req.body);
  //   io.getIO().on("send_message", (data) => {
  //     console.log(data);
  //   });
};
exports.createnewroom = (req, res) => {
  // tạo room
  console.log("b");
  const newRoom = new Chat({});
  newRoom.save();
};
