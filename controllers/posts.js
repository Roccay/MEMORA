const Room = require("../models/room");

function create(req, res) {
  const specArea = req.params.location;

  Room.findById(req.params._id, function (err, room) {
    room.posts.unshift(req.body);
    const specArea = req.params.location;
    let isLocked = !!room.password;
    const senderName = req.cookies.userName;
    room.save(function (err) {
      if (room.key != "") {
        // res.render("room.ejs", { room, specArea, senderName, isLocked });
        res.redirect(`/lobby/${specArea}/${room._id}/locked/${room.key}`);
      } else {
        res.redirect(`/lobby/${specArea}/${room._id}`);
      }
    });
  });
}

module.exports = {
  create,
};
