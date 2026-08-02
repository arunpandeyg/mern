import Image from "../models/image.model.js";
import cloudinary from "../config/cloudinary.js";
import { upload } from "../lib/multer.js";

export const imageUpload = upload.single("image");

export const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await Image.findById(req.user.id);
        user.image = result.secure_url;
        await user.save();
        res.status(200).json({ message: "Image uploaded successfully" });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};