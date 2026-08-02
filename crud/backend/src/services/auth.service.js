import User from "../models/user.model.js"
import cloudinary from "../config/cloudinary.js"

export const signupService = async ({ name, email, password, phone, gender, community, file }) => {
  if (!file) {
    throw new Error("Image file missing")
  }

  // upload image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: "users",
  })

  // save user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    gender,
    community,
    image: uploadResult.secure_url,
  })

  return user
}



export const signinService = async ({ email }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error("Invalid credentials")
  }

  return user
}

