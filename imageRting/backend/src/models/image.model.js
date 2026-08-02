// FILE: src/models/image.model.js
const mongoose2 = require("mongoose");

const imageSchema = new mongoose2.Schema(
  {
    title: { type: String },
    description: String,
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    createdBy: { type: mongoose2.Schema.Types.ObjectId, ref: "User" },
    visibility: {
      type: String,
      enum: ["international", "national", "state"],
      default: "national",
    },
    nation: String,
    state: String,
    district: String,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose2.model("Image", imageSchema);
