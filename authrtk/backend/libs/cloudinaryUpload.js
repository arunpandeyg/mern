import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "users",
  });
  return result.secure_url;
};

export const deleteImage = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

export const updateImage = async (publicId, file) => {
  await cloudinary.uploader.destroy(publicId);
  const result = await cloudinary.uploader.upload(file, {
    folder: "users",
  });
  return result.secure_url;
};

export default { uploadImage, deleteImage, updateImage };