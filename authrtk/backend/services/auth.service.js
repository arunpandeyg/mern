import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const registerUser = async (data) => {
  if (!data || !data.email) {
    throw new Error("Invalid data");
  }
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("User already exists");

  const hashed = await bcrypt.hash(data.password, 10);

  const emailToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    ...data,
    password: hashed,
    emailVerifyToken: emailToken,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  return { user, accessToken, refreshToken };
};

export const logoutUser = async (refreshToken) => {
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
};

export const refreshToken = async (refreshToken) => {
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Invalid token");

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    id: user._id,
  });

  await User.findOneAndUpdate({ _id: user._id }, { refreshToken: newRefreshToken });

  return { accessToken, refreshToken: newRefreshToken };
};

export const changeRole = async (id, role) => {
  const user = await User.findOneAndUpdate({ _id: id }, { role }, { new: true }); 
  return user;
};

export const changeName = async (id, name) => {
  const user = await User.findOneAndUpdate({ _id: id }, { name }, { new: true }); 
  return user;
};

export const changePassword = async (id, password, newPassword) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  const user = await User.findOneAndUpdate({ _id: id }, { password: hashed }, { new: true }); 
  return user;
};

export const changeEmail = async (id, email) => {
  const user = await User.findOneAndUpdate({ _id: id }, { email }, { new: true }); 
  return user;
};

export const resendVerifyEmail = async (email) => {
  const user = await User.findOneAndUpdate({ email }, { emailVerifyToken: crypto.randomBytes(32).toString("hex") }, { new: true }); 
  return user;
};

export const forgotPassword = async (email) => {
  const user = await User.findOneAndUpdate({ email }, { passwordResetToken: crypto.randomBytes(32).toString("hex") }, { new: true }); 
  return user;
};

export const verifyEmail = async (token) => {
  const user = await User.findOneAndUpdate({ emailVerifyToken: token }, { emailVerifyToken: null }, { new: true }); 
  return user;
};

export const resetPassword = async (token, password) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.findOneAndUpdate({ passwordResetToken: token }, { password: hashed, passwordResetToken: null }, { new: true }); 
  return user;
};

export const blockAccount = async (id) => {
  const user = await User.findOneAndUpdate({ _id: id }, { blocked: true }, { new: true }); 
  return user;
};

export const unblockAccount = async (id) => {
  const user = await User.findOneAndUpdate({ _id: id }, { blocked: false }, { new: true }); 
  return user;
};

export const deleteAccount = async (id) => {
  const user = await User.findOneAndDelete({ _id: id }); 
  return user;
};

export const getUser = async (id) => {
  const user = await User.findOne({ _id: id }); 
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find(); 
  return users;
};

export const updateUser = async (id, data) => {
  const user = await User.findOneAndUpdate({ _id: id }, data, { new: true }); 
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findOneAndDelete({ _id: id }); 
  return user;
};

export const updateMe = async (id, data) => {
  const user = await User.findOneAndUpdate({ _id: id }, data, { new: true }); 
  return user;
};



