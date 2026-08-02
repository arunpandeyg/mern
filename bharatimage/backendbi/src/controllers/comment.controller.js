import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";


export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ bim: postId })
    .populate("user", "username img displayName")
    .sort({ createdAt: -1 });

  res.status(200).json(comments);
};

export const addComment = async (req, res) => {
  const { description, bim } = req.body;

  const userId = req.userId;
  const comment = await Comment.create({ description, bim, user: userId });

  res.status(201).json(comment);
};
