import cloudinary from "../config/cloudinary.js"

export const uploadImage = async (buffer, folder) => {
  return await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${buffer.toString("base64")}`,
    { folder }
  )
}
