import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDatabase from "./config/mongodb.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173", // frontend origin
    credentials: true,              // allow cookies
  }
));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port: ${PORT}`);
});
