import User from "../models/User.model.js"
import cloudinary from "../config/cloudinary.js"

// GET BY ID
export const getUserByIdService = async (id) => {
  const user = await User.findById(id)
  if (!user) throw new Error("User not found")
  return user
}

// GET ALL
export const getAllUsersService = async () => {
  return await User.find()
}

// UPDATE
export const updateUserByIdService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
  if (!user) throw new Error("User not found")
  return user
}

// DELETE
export const deleteUserByIdService = async (id) => {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new Error("User not found")
  return user
}

export const getMeService = async (userId) => {
  const user = await User.findById(userId).select("-password")
  if (!user) throw new Error("User not found")
  return user
}


export const updateUserImageService = async (userId, file) => {
  if (!file) throw new Error("Image file required")

  const user = await User.findById(userId)
  if (!user) throw new Error("User not found")

  // delete old image if exists
  if (user.image) {
    const publicId = user.image.split("/").pop().split(".")[0]
    await cloudinary.uploader.destroy(`users/${publicId}`)
  }

  // upload new image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "users",
  })

  user.image = uploadResult.secure_url
  await user.save()

  return user
}
