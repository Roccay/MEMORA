var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");
/* GET users listing. */

router.get("/signup", userCtrl.signUpPage);
router.post("/signup", userCtrl.signUp);
router.get("/login", userCtrl.loginPage);
router.post("/login", userCtrl.logIn);
router.get("/logout", userCtrl.logOut);
router.get("/myPage", userCtrl.myPage);
router.post("/:location/:_id", userCtrl.delete);
router.post("/:_id", userCtrl.update);
module.exports = router;
