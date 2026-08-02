import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'
import {
  createUserService,
  getUserByIdService,
  getAllUsersService,
  updateUserByIdService,
  deleteUserByIdService,
  getMeService,
  updateUserImageService,
  searchUsersService,
} from '../services/user.service.js'


export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone, gender, community } = req.body

    if (!name || !email || !password || !phone || !gender || !community) {
      throw new Error('All fields are required')
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists')
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format')
    }

    const user = await createUserService({
      name,
      email,
      password,
      phone,
      gender,
      community,
      file: req.file
    })

    const token = generateTokenAndSetCookie(user._id, res)

    res.status(201).json({
      success: true,
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


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
    const { name, email, password, phone, gender, community, image } = req.body || {};

    // if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
    // return res.status(403).json({ message: "Not allowed" });
    // }
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

export const searchUsers = async (req, res) => {
  try {
    const users = await searchUsersService(req.query)
    res.json({ success: true, users })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

