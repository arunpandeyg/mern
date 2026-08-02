import mongoose from 'mongoose'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../config/cloudinary.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  getMeService
} from '../services/text.service.js'

export const createUser = async (req, res) => {
  try {
    // console.log("BODY:", req.body)
    // console.log("FILE:", req.file)

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

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService()
    res.json({ success: true, users })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.id)
    res.json({ success: true, user })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    })
  }
}

// UPDATE USER
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

// export const updateUserById = async (req, res) => {
// 	const { id } = req.params;

// 	const user = req.body;

// 	if (!mongoose.Types.ObjectId.isValid(id)) {
// 		return res.status(404).json({ success: false, message: "Invalid User Id" });
// 	}

// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
// 		res.status(200).json({ success: true, data: updatedUser });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Server Error" });
// 	}
// };

export const updateUserItemById = async (req, res) => {
	const { id } = req.params;

	const user = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid User Id" });
	}

	try {
		const updatedUser = await User.findByIdAndUpdate(id, { 
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      gender: user.gender,
      community: user.community,
      image: user.image,
    }, { new: true });
		res.status(200).json({ success: true, data: updatedUser });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

// UPDATE USER

// export const updateUserById = async (req, res) => {

//   try {
//     const userId = req.user?.id

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: 'Unauthorized - user not found'
//       })
//     }
//     const { name, email, password, phone, gender, community } = req.body

//     const updateData = {
//       name,
//       email,
//       password,
//       phone,
//       gender,
//       community
//     }

//     const file = req.file // multer

//     if (
//       !name &&
//       !email &&
//       !password &&
//       !phone &&
//       !gender &&
//       !community &&
//       !file
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields provided for update'
//       })
//     }

//     if (password) {
//       const salt = await bcrypt.genSalt(10)
//       updateData.password = await bcrypt.hash(password, salt)
//     }

//     if (file) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: 'users'
//       })
//       updateData.image = result.secure_url
//     }

//     // 🧹 Remove undefined fields (important for partial updates)
//     Object.keys(updateData).forEach(key => {
//       if (updateData[key] === undefined) {
//         delete updateData[key]
//       }
//     })

//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'No fields provided for update'
//       })
//     }

//     if (updateData.password) {
//       const salt = await bcrypt.genSalt(10)
//       updateData.password = await bcrypt.hash(updateData.password, salt)
//     }

//     if (updateData.email) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//       if (!emailRegex.test(updateData.email)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid email format'
//         })
//       }
//     }

//     if (updateData.phone) {
//       const phoneRegex = /^\d{10}$/
//       if (!phoneRegex.test(updateData.phone)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid phone number format'
//         })
//       }
//     }

//     if (updateData.gender) {
//       if (updateData.gender !== 'male' && updateData.gender !== 'female') {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid gender value'
//         })
//       }
//     }

//     if (updateData.community) {
//       if (
//         updateData.community !== 'community1' &&
//         updateData.community !== 'community2'
//       ) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid community value'
//         })
//       }
//     }

//     if (updateData.image) {
//       const result = await cloudinary.uploader.upload(updateData.image, {
//         folder: 'users'
//       })
//       updateData.image = result.secure_url
//     }

//     const updatedUser = await updateUserByIdService(userId, updateData, file)

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: updatedUser
//     })

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong'
//     })
//   }
// }

export const deleteUser = async (req, res) => {
  try {
    await deleteUserByIdService(req.params.id)
    res.json({ success: true, message: 'User deleted' })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await getMeService(req.userId)
    res.json({ success: true, user })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    })
  }
}
