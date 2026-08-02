import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import cloudinary from "../lib/cloudinary.js";


export const registerService = async ({ name, email, password, phone, gender, image }) => {
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
    
};

export const loginService = asyncHandler(async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }  

    return user;
});

export const logoutService = asyncHandler(async (res) => {
    res.cookies("jwt", "", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Logout successful" });
});


