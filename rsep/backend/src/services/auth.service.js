import User from "../models/User.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";

export const signupService = async ({
  name,
  email,
  password,
  gender,
  phone,
  role,
  file,
}) => {
  if (!file) {
    throw new Error("Image file missing");
  }

  // upload image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "users",
  });

  // save user
  const user = await User.create({
    name,
    email,
    password,
    gender,
    phone,
    role,
    image: uploadResult.secure_url,
  });

  return user;
};

export const signinService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password || "");
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (!user) {
    throw new Error("Invalid credentials");
  }  

  return user;
};
