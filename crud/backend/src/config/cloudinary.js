import dotenv from "dotenv"
dotenv.config()
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({  
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,  
})

console.log("API key verified", process.env.CLOUDINARY_API_KEY);
export default cloudinary

// export const verifyApiKey = (req, res, next) => {
//     const { api_key } = req.query;
//     if (!api_key || api_key.trim() === "") {
//         return res.status(400).json({ message: "Must supply api_key" });
//     }
//     if (api_key !== process.env.CLOUDINARY_API_KEY) {
//         return res.status(403).json({ message: "Invalid api_key" });
//     }
    
//     // rest of your code...
// }