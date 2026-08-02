import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";


export const errorMiddleware = expressAsyncHandler(async (err, req, res, next) => {
     if (!res) {
        throw new Error("Response object is undefined");
    }
    if (err.name === "UnauthorizedError") {
        const token = req.cookies?.jwt;
        if (token) {
            jwt.verify(token, id, async (err, decodedToken) => {
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
    } else {
        next();
    }
});
export default errorMiddleware;

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "Resource not found";
        res.status(404);
    }
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export { notFound, errorHandler };