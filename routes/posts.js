const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/posts");

router.post("/lobby/:location/:_id/posts", postsCtrl.create);
module.exports = router;
