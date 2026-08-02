import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import cloudinary from "../lib/cloudinary.js";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const getUsersService = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

export const createUserService = asyncHandler(async ({ name, email, password, phone, gender, image }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    if (image) {
        const result = await cloudinary.uploader.upload(image, {
            folder: "users",
        });
        image = result.secure_url;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
   
    const user = await User.create({ name, email, password: hashedPassword, phone, gender, image });
    return user;
    
});

export const getUserByIdService = asyncHandler(async (userId) => {
  return await User.findById(userId);
});

export const updateUserService = asyncHandler(async (userId, userData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    return updatedUser;
});
export const deleteUserService = asyncHandler(async (userId) => {
    try {
        const users = await User.findByIdAndDelete(userId);
        if (users) {
            return { message: "User deleted successfully" };
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle the error here
        console.error(error);
        throw error;
    }
});

export const currentUserService = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const validUserId = mongoose.Types.ObjectId(userId);
        const user = await User.findById(validUserId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the current user' });
    }
});



