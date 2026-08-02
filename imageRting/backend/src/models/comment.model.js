// FILE: src/models/comment.model.js
const mongoose4 = require("mongoose");

const commentSchema = new mongoose4.Schema(
  {
    user: {
      type: mongoose4.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: mongoose4.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    text: { type: String, required: true },
    moderated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose4.model("Comment", commentSchema);
