import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
};