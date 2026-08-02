// FILE: src/models/user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phoneNumber: String,
    imageUrl: String,
    birthdate: Date,
    religion: String, // store as provided (ensure consent)
    country: String,
    state: String,
    district: String,
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
