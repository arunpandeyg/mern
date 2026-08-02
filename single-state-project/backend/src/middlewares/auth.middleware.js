import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

 export const protectRoute = expressAsyncHandler(async (req, res, next) => {
    if (!res) {
        throw new Error("Response object is undefined");
    }
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
});
export default protectRoute;