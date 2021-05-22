const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentschema = new Schema(
  {
    text: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
          },
      username: String,
            },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model('Comment', commentschema);

exports.Comment=Comment;