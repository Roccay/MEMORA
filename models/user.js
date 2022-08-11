const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const roomSchema = require("../models/room");
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
