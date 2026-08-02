import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        exposedHeaders: ["Set-Cookie"],        
    }
));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorMiddleware);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
