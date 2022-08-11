var express = require("express");
var router = express.Router();
const roomCtrl = require("../controllers/rooms");

/* GET home page. */

router.get("/", roomCtrl.index);
router.get("/:location", roomCtrl.intoRoom);
router.get("/:location/new", roomCtrl.new);
router.get("/:location/:_id/", roomCtrl.show);
router.post("/:location", roomCtrl.create);
router.get("/:location/:_id/locked", roomCtrl.enterPwd);
router.post("/:location/:_id/locked/:key", roomCtrl.checkPwd);
router.get("/:location/:_id/locked/:key", roomCtrl.showInRoom);
router.get("/:location/:_id/edit", roomCtrl.updatePage);
router.post("/:location/:_id", roomCtrl.edit);
module.exports = router;
