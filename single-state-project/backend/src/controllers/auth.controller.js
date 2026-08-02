import  {registerService, loginService, logoutService } from "../services/auth.service.js";
import asyncHandler from "express-async-handler";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password, phone, gender, image } = req.body;
    const user = await registerService({ name, email, password, phone, gender, image });

    const token = generateTokenAndSetCookies(user._id, res);
    console.log("Registered successful", user);
    res.status(201).json({ user, token });
});

// export const login = asyncHandler(async (req, res) => {

export const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    const token = generateTokenAndSetCookies(user._id, res);
    console.log("Signed in successful", user);
    res.status(200).json({ user, token });
});

export const signout = asyncHandler(async (req, res) => {
    await logoutService(res);
    console.log("Signed out successful", res);
    res.status(200).json({ message: "Signed out successful" });
});