import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupService = async ({ name, username, email, password, file }) => {
  if (!file) {
    throw new Error("Image file missing");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // upload image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "users",
  });

  if (!uploadResult.secure_url) {
    throw new Error("Image upload failed");
  }

  // save user
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    image: uploadResult.secure_url,
  });

  return user;
};

export const signinService = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
};

export const signoutService = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({ message: "Refresh token not found" });
    }
    const user = await User.findOne({ refreshToken: token });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.refreshToken = "";
    await user.save();
    res.clearCookie("refreshToken");
    res.json({ message: "Signout successful" });
  } catch (error) {
    console.log("Error in signout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
  await user.save();
  return resetToken;
};

export const resetPasswordService = async (resetToken, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Invalid or expired token");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return user;
};

export const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  return user;
};

export const updateProfileService = async (userId, name, username, email, image) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.name = name;
  user.username = username;
  user.email = email;
  user.image = image;
  await user.save();
  return user;
};

export const updatePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  return user;
};

export const updateEmailService = async (userId, email) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.email = email;
  await user.save();
  return user;
};

export const updateUsernameService = async (userId, username) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.username = username;
  await user.save();
  return user;
};

export const updateImageService = async (userId, image) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.image = image;
  await user.save();
  return user;
};

export const updateNameService = async (userId, name) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.name = name;
  await user.save();
  return user;
};

export const getAllUsersService = async () => {
  const users = await User.find();
  return users;
};

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const deleteUserByIdService = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUserByIdService = async (userId, name, username, email, image) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  user.name = name;
  user.username = username;
  user.email = email;
  user.image = image;
  await user.save();
  return user;
};

export const updatePasswordByIdService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  return user;
};
