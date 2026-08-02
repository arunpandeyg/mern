import mongoose from "mongoose";
import { required } from "zod/mini";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 50,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password by default
    },
     // OPTIONAL FIELDS
    phone: {
      type: String,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },

    image: {
      type: String, // Cloudinary / S3 URL     
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
