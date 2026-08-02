import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDatabase from "./config/mongodb.js";
import authRoutes from "./routes/auth.route.js";
import imageRoutes from "./routes/image.route.js";
import cloudinary from "./config/cloudinary.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors());


// app.post("/", async (req, res) => {
//   const { images } = req.body || {};
//   const uploadedImgs = images?.map(async (image) => {
//     const upload = await cloudinary.uploader.upload(
//       image,
//       {
//         upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
//         public_id: `image_${Date.now()}`,
//         allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "webp"],
//       },
//       function (error, result) {
//         if (error) {
//           console.log(error);
//         }
//         console.log(result);
//         res.status(200).json(uploadedImgs);
//       },
//     );
//     return upload;
//   });

//   try {
//     const fulfilled = await Promise.all(uploadedImgs).then((values) => {
//       return values;
//     });
//     const publicIds = fulfilled.map((image) => {
//       return image.public_id;
//     });
//     console.log(publicIds);
//     res.status(200).json(publicIds);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// app.post("/upload", async (req, res) => {
//   const { image } = req.body;
//   const result = await cloudinary.uploader.upload(
//     image,
//     { folder: "images", api_preset: process.env.CLOUDINARY_UPLOAD_PRESET, public_id: `${Date.now()}`, allowed_formats: ["jpg", "png", "jpeg"] },
//     (error, result) => {
//       if (error) {
//         console.error("Error uploading image:", error);
//         return res.status(500).json({ message: "Failed to upload image" });
//       }
//       console.log("Upload Result:", result);
//       res.status(200).json({ message: "Image uploaded successfully", result });
//     },
//   );
//   res.status(200).json({ message: "Image uploaded successfully", result });
// });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/image", imageRoutes);

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port: ${PORT}`);
});
