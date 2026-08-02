// FILE: src/controllers/comment.controller.js
const Comment = require("../models/comment.model.js");

exports.add = async (req, res) => {
  const { text } = req.body;
  const imageId = req.params.id;
  if (!text) return res.status(400).json({ message: "Text required" });
  const c = await Comment.create({ user: req.user._id, image: imageId, text });
  res.status(201).json({ comment: c });
};

exports.list = async (req, res) => {
  const imageId = req.params.id;
  const list = await Comment.find({ image: imageId }).populate(
    "user",
    "fullName imageUrl"
  );
  res.json({ comments: list });
};
