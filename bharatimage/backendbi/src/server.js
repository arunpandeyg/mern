import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import bimRouter from "./routes/bim.route.js";
import commentRouter from "./routes/comment.route.js";
import boardRouter from "./routes/board.route.js";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser({ urlencoded: true, limit: "50mb", secret: process.env.JWT_SECRET }));
app.use(
  cors(
    {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },    
  ),
);
app.use(fileUpload());

app.use("/users", userRouter);
app.use("/bims", bimRouter);
app.use("/comments", commentRouter);
app.use("/boards", boardRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
