import {
  getUserByIdService,
  getAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
  getMeService,
  updateUserImageService,
} from "../services/user.service.js"

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id)
    res.json({ success: true, user })
  } catch (err) {
    res.status(404).json({ success: false, message: err.message })
  }
}

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService()
  res.json({ success: true, users })
}

export const updateUserById = async (req, res) => {
  try {
    const user = await updateUserByIdService(req.params.id, req.body)
    res.json({ success: true, user })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    await deleteUserByIdService(req.params.id)
    res.json({ success: true, message: "User deleted" })
  } catch (err) {
    res.status(404).json({ success: false, message: err.message })
  }
}


export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.userId)
    res.json({ success: true, user })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
}



export const updateMyImage = async (req, res) => {
  try {
    const user = await updateUserImageService(req.userId, req.file)
    res.json({ success: true, user })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

export const updateProfileImage = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!req.file) {
    return res.status(400).json({ message: "Image required" })
  }

  // delete old image
  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id)
  }

  // upload new
  const uploaded = await uploadImage(req.file.buffer, "profiles")

  user.image = {
    url: uploaded.secure_url,
    public_id: uploaded.public_id,
  }

  await user.save()

  res.json(user)
}