import {
  getUserByIdService,
  getAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
  getMeService,
  updateUserImageService,
} from '../services/user.service.js'

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
    const { id } = req.params
    const { name, email, password, phone, gender, community, image } = req.body

    const updateData = {
      name,
      email,
      password,
      phone,
      gender,
      community,
      image,
    }

    const user = await updateUserByIdService(id, updateData)

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    await deleteUserByIdService(req.params.id)
    res.json({ success: true, message: 'User deleted' })
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

