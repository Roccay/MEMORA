const Room = require("../models/room");
const Location = require("../models/location");
const User = require("../models/user");
const md5 = require("md5");

function signUpPage(req, res) {
  res.render("account/signup.ejs");
}

function myPage(req, res) {
  const userName = req.cookies.userName;

  User.findOne({ userName: userName }, function (err, user) {
    Room.find({ ownerName: userName }, function (err, rooms) {
      res.render("account/myPage.ejs", { userName, rooms, user });
    });
  });
}
function signUp(req, res) {
  const user = new User({
    userName: req.body.userName,
    password: md5(req.body.password),
    description: req.body.description,
  });

  User.findOne({ userName: req.body.userName }, function (err, u) {
    if (u) {
      if (req.body.userName === user.userName) {
        res.send("this name has been taken");
        return;
      } else {
        user.save(function (err) {
          console.log(err);
          if (err) return res.redirect("account/signup.ejs");

          res.redirect("/account/login");
        });
      }
    } else {
      user.save(function (err) {
        console.log(err);
        if (err) return res.redirect("account/signup.ejs");

        res.redirect("/account/login");
      });
    }
  });
}

function loginPage(req, res) {
  res.render("account/login.ejs");
}

function logIn(req, res) {
  const inputName = req.body.userName;
  const pwd = md5(req.body.password);
  User.findOne({ userName: inputName }, function (err, user) {
    if (user.password === pwd) {
      if (req.cookies.userName === inputName) {
        res.send("you LOGGED IN ALREADY!");
      } else {
        res.cookie("userName", inputName);
        setTimeout(function () {
          res.redirect("/lobby");
        }, 200);
      }
    } else {
      res.send("password is wrong!");
    }
  });
}

function logOut(req, res) {
  // const userName = req.cookies.userName;
  res.clearCookie("userName");
  res.redirect("/lobby");
}

function deleteRoom(req, res, next) {
  const targetRoom = Room.findOne({ _id: req.params._id });
  Room.deleteOne({ _id: req.params._id }, function (err) {
    res.redirect("/account/myPage");
  });
}

function editUser(req, res) {
  User.findOne({ userName: req.cookies.userName }, function (err, user) {
    user.updateOne({ description: req.body.description }, function (err, user) {
      res.redirect("/account/myPage");
    });
  });
}

module.exports = {
  signUpPage,
  signUp,
  loginPage,
  logIn,
  logOut,
  myPage,
  delete: deleteRoom,
  update: editUser,
};
