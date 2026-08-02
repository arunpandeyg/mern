import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToMongoDB } from './lib/db/connectToMongoDB.js';
import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(PORT, () => {
    connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});