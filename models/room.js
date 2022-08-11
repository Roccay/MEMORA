const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    name: String,
    userDes: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const imppostSchema = new Schema(
  {
    name: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const roomSchema = new Schema(
  {
    location: String,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Welcome!",
    },
    password: {
      type: Boolean,
    },
    key: String,
    ownerName: String,
    posts: [postSchema],
    importantPosts: [imppostSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
