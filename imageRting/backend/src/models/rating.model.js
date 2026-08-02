// FILE: src/models/rating.model.js
const mongoose3 = require("mongoose");

const ratingSchema = new mongoose3.Schema(
  {
    user: {
      type: mongoose3.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    image: {
      type: mongoose3.Schema.Types.ObjectId,
      ref: "Image",
      required: true,
      index: true,
    },
    reaction: {
      type: String,
      enum: ["like", "dislike", "none"],
      default: "none",
    },
    numericRating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

ratingSchema.index({ user: 1, image: 1 }, { unique: true });

module.exports = mongoose3.model("Rating", ratingSchema);
