import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import  upload  from "../lib/multer.js";

export const imageUpload = upload.single("image");

export const uploadImage = async (req, res) => {
   try {
		const allowedFields = [
			"name",
			"email",
			"password",
			"phone",
			"role",
			"profilePicture",
			"gender",		
        ];

		const updatedData = {};

		for (const field of allowedFields) {
			if (req.body[field]) {
				updatedData[field] = req.body[field];
			}
		}

		if (req.body.profilePicture) {
			const result = await cloudinary.uploader.upload(req.body.profilePicture);
			updatedData.profilePicture = result.secure_url;
		}

		// if (req.body.bannerImg) {
		// 	const result = await cloudinary.uploader.upload(req.body.bannerImg);
		// 	updatedData.bannerImg = result.secure_url;
		// }

		const user = await User.findByIdAndUpdate(req.user._id, { $set: updatedData }, { new: true }).select(
			"-password"
		);

		res.json(user);
	} catch (error) {
		console.error("Error in updateProfile controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

// export const uploadImage = async (req, res) => {
//     try {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         const image = new Image({
//             url: result.secure_url,
//             public_id: result.public_id
//         });
//         await image.save();
        
//         res.status(200).json({ message: "Image uploaded successfully", image });
//     } catch (error) {
//         console.error("Error uploading image:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };