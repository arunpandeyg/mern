import  {registerService, loginService, logoutService } from "../services/auth.service.js";
import asyncHandler from "express-async-handler";
import generateTokenAndSetCookies from "../utils/generateToken.js";



export const signup = asyncHandler(async (req, res) => {
     if (!req.body) {
    throw new Error("Request body is missing");
  }
    const { name, email, password, phone, gender, image } = req.body;
    if (!name || !email || !password || !phone || !gender || !image) {
    throw new Error("Missing required properties in request body");
  }
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);
    const user = await registerService({ name, email, password, phone, gender, image });

    const token = generateTokenAndSetCookies(user._id, res);
    console.log("User Registered successful", user);
    res.status(201).json({ user, token });
});

export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    const token = generateTokenAndSetCookies(user._id, res);
    console.log("User Signed in successful", user);
    res.status(200).json({ user, token });
});

export const signout = asyncHandler(async (req, res) => {
    await logoutService(res);
    console.log("User Signed out successful", res);
    res.status(200).json({ message: "Signed out successful" });
});