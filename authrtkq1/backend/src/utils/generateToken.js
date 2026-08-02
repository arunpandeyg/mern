import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
         expiresIn: "1d" 
        });
    res.cookie("jwt", token, { 
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        
    });
    return token;
};

export default generateTokenAndSetCookies;