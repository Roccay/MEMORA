const express = require("express");
const router = express.Router();
const postsCtrl = require("../controllers/impPosts");

router.post("/lobby/:location/:_id/posts2", postsCtrl.create);

module.exports = router;
