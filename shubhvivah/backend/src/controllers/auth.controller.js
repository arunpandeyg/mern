import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens, storeRefreshToken, setCookies } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";
import cloudinary from "cloudinary";





export const signup = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, } = req.body;
        // Validate required fields
        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        // Hash the password (you can use bcrypt or any other library)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        
        // Create a new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            isAdmin: false // Default to false, can be updated later
        });
        await user.save();

        // authenticate
		const { accessToken, refreshToken } = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);

		setCookies(res, accessToken, refreshToken);

        res.status(201).json({ 
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: false,
            message: "User created successfully"
        });
        
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const signin = async (req, res) => {
   try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // authenticate
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(200).json({ 
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            message: "User signed in successfully"
        }); 
    
   } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
   
}
export const signout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User signed out successfully" });
        
    } catch (error) {
        console.error("Error during signout:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude password field
        res.status(200).json(users);        
        
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is passed as a URL parameter
        const user = await User.findById(userId, "-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);        
        
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is passed as a URL parameter
        const { fullName, email, phoneNumber, profilePicture, gender, dharma, varna, jati, occupation, income, state, district, address, height, weight, color, dob, tob, pob, age } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
               
        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profilePicture = profilePicture;
        user.gender = gender;
        user.dharma = dharma;
        user.varna = varna;
        user.jati = jati;
        user.occupation = occupation;
        user.income = income;
        user.state = state;
        user.district = district;
        user.address = address;
        user.height = height;
        user.weight = weight;
        user.color = color;
        user.dob = dob;
        user.tob = tob;
        user.pob = pob;
        user.age = age;
        await user.save();
        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture,
            gender: user.gender,
            dharma: user.dharma,
            varna: user.varna,
            jati: user.jati,
            occupation: user.occupation,
            income: user.income,
            state: user.state,
            district: user.district,
            address: user.address,
            height: user.height,
            weight: user.weight,
            color: user.color,
            dob: user.dob,
            tob: user.tob,
            pob: user.pob,
            age: user.age,
            message: "User updated successfully"});
        
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming user ID is passed as a URL parameter
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}