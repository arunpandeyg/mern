// FILE: src/controllers/rating.controller.js
const mongoose = require("mongoose");
const Rating = require("../models/rating.model.js");
const Image = require("../models/image.model.js");

// Enforce: user can have only one 'like' across all images. Reaction values: like|dislike|none
exports.react = async (req, res) => {
  const userId = req.user._id;
  const imageId = req.params.id;
  const { reaction, numericRating } = req.body;
  if (reaction && !["like", "dislike", "none"].includes(reaction))
    return res.status(400).json({ message: "Invalid reaction" });
  if (numericRating && (numericRating < 1 || numericRating > 5))
    return res.status(400).json({ message: "Invalid numeric rating" });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Upsert rating for this user+image
    const updated = await Rating.findOneAndUpdate(
      { user: userId, image: imageId },
      {
        $set: {
          reaction: reaction || "none",
          numericRating: numericRating || undefined,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, session }
    );

    // If reaction is like, ensure no other rating doc for this user has like
    let affectedPrevious = null;
    if (reaction === "like") {
      const resUpdate = await Rating.updateMany(
        { user: userId, image: { $ne: imageId }, reaction: "like" },
        { $set: { reaction: "none" } },
        { session }
      );
      affectedPrevious = resUpdate.modifiedCount;
    }

    await session.commitTransaction();
    session.endSession();
    // Return updated summary for this image
    const summary = await exports._computeImageSummary(imageId);
    res.json({
      rating: updated,
      affectedPreviousLikes: affectedPrevious,
      summary,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

exports.summary = async (req, res) => {
  const imageId = req.params.id;
  const summary = await exports._computeImageSummary(imageId);
  res.json({ summary });
};
exports._computeImageSummary = async (imageId) => {
  const agg = await Rating.aggregate([
    { $match: { image: mongoose.Types.ObjectId(imageId) } },
    {
      $group: {
        _id: "$reaction",
        count: { $sum: 1 },
        avgRating: { $avg: "$numericRating" },
      },
    },
  ]);
  const summary = { likes: 0, dislikes: 0, none: 0, avgRating: null };
  agg.forEach((a) => {
    if (a._id === "like") summary.likes = a.count;
    if (a._id === "dislike") summary.dislikes = a.count;
    if (a._id === "none") summary.none = a.count;
    if (a.avgRating) summary.avgRating = Math.round(a.avgRating * 100) / 100;
  });
  return summary;
};
