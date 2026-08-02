import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
    api_preset: process.env.CLOUDINARY_UPLOAD_PRESET
});

export default cloudinary;

// import { v2 as cloudinary } from "cloudinary"

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export default cloudinary


export const connectToCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_preset: process.env.CLOUDINARY_UPLOAD_PRESET
    });
    console.log('Connected to Cloudinary');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error);
  }
};



