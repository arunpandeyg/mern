import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const SECRET_KEY = process.env.SECRET_KEY;
export const NODE_ENV = process.env.NODE_ENV;
export const CLIENT_URL = process.env.CLIENT_URL;

export default { PORT, MONGO_URI, SECRET_KEY, NODE_ENV, CLIENT_URL };
