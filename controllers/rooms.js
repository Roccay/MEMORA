const Room = require("../models/room");
const Location = require("../models/location");
const User = require("../models/user");

function index(req, res) {
  let locationList = Location.getLocation();
  const accountName = req.cookies.userName;
  console.log("user", accountName);
  res.render("lobby.ejs", { locationList, accountName });
}
function intoRoom(req, res) {
  const senderName = req.cookies.userName;
  const specArea = req.params.location;
  Room.find({ location: specArea }, function (err, rooms) {
    res.render("roomList.ejs", { specArea, rooms, senderName });
  });
}
function enterPwd(req, res) {
  Room.findById(req.params._id, function (err, room) {
    const specArea = req.params.location;
    res.render("enterPwd.ejs", { room, specArea });
  });
}
function checkPwd(req, res) {
  Room.findById(req.params._id, function (err, room) {
    const specArea = req.params.location;
    const senderName = req.cookies.userName;
    console.log(req.body.key);
    if (req.body.key == room.key) {
      res.render("room.ejs", { room, specArea, senderName });
    } else {
      res.send("password wrong");
    }
  });
}
function newRoom(req, res) {
  const specArea = req.params.location;
  const owner = req.cookies.userName;
  res.render("createRoom.ejs", { specArea, owner });
}

function createRoom(req, res) {
  req.body.password = !!req.body.password;

  const room = new Room(req.body);
  const specArea = req.params.location;

  room.save(function (err) {
    if (err) return res.redirect(`/lobby/${specArea}`);

    res.redirect(`/lobby/${specArea}`);
  });
}

function show(req, res) {
  Room.findById(req.params._id, function (err, room) {
    const specArea = req.params.location;
    let isLocked = !!room.password;
    const senderName = req.cookies.userName;
    if (room.key != "") {
      res.render("enterPwd.ejs", { room, specArea });
    } else {
      res.render("room.ejs", { room, specArea, senderName, isLocked });
    }
  });
}

function showInRoom(req, res) {
  Room.findById(req.params._id, function (err, room) {
    const specArea = req.params.location;
    const senderName = req.cookies.userName;
    res.render("room.ejs", { room, specArea, senderName });
  });
}

function updatePage(req, res) {
  Room.findById(req.params._id, function (err, room) {
    const specArea = req.params.location;
    const owner = req.cookies.userName;
    res.render("editRoom.ejs", { specArea, owner, room });
  });
}
function editPage(req, res) {
  console.log(req.params._id);
  Room.findOne({ _id: req.params._id }, function (err, room) {
    room.updateOne(
      {
        title: req.body.title,
        description: req.body.description,
        password: !!req.body.password,
        key: req.body.key,
      },
      function (err, room) {
        res.redirect("/account/myPage");
      }
    );
  });
  // Room.findOne({ _id: req.params._id }, function (err, room) {
  //   Room.updateOne(
  //     {
  //       room: req.body,
  //     },
  //     function (err) {
  //       res.redirect("/account/myPage");
  //     }
  //   );
  // });
}
module.exports = {
  index,
  intoRoom,
  new: newRoom,
  create: createRoom,
  show,
  enterPwd,
  checkPwd,
  showInRoom,
  updatePage,
  edit: editPage,
};
