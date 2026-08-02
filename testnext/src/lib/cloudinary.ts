// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImageFromBuffer(
  buffer: Buffer,
  filename = "upload"
) {
  // upload using base64
  const base64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  const res = await cloudinary.uploader.upload(base64, {
    folder: "admin_uploads",
    public_id: filename,
  });
  return res;
}

export default cloudinary;
