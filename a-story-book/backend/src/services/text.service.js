import User from '../models/user.model.js'
import Comment from '../models/comment.model.js'
import cloudinary from '../config/cloudinary.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { requireRole } from '../middleware/role.middleware.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const createUserService = async ({
  name,
  email,
  password,
  phone,
  gender,
  community,
  file
  }) => {
  if (!file) {
    throw new Error('Image file missing')
  }

  // upload image
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: 'users'
  })

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt) 

  // save user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    gender,
    community,
    image: uploadResult.secure_url
  })

  return user
}

export const getAllUsersService = async () => {
  const users = await User.find()
  if (users.length === 0) {
    throw new Error('No users found')
  }
  return users
}

export const getUserByIdService = async userId => {
  const user = await User.findById(userId).select('-password')
  if (!user) throw new Error('User not found')
  return user
}

// UPDATE
// UPDATE
export const updateUserByIdService = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  })
  if (!user) throw new Error("User not found")
  return user
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

// UPDATE
// export const updateUserByIdService = async (userId, updateData, file) => {
//   try {
//     const user = await User.findById(userId)
//     if (!user) {
//       throw new Error('User not found')
//     }

//     // 🖼️ Upload image if exists
//     if (file) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: 'users'
//       })

//       updateData.image = result.secure_url
//     }

//     // 🔐 Hash password if updating
//     if (updateData.password) {
//       const salt = await bcrypt.genSalt(10)
//       updateData.password = await bcrypt.hash(updateData.password, salt)
//     }
   
//     // 🧹 Remove undefined fields (important for partial updates)
//     Object.keys(updateData).forEach(key => {
//       if (updateData[key] === undefined) {
//         delete updateData[key]
//       }
//     })

//     // 🔄 Update user
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     ).select('-password')

//     return updatedUser
//   } catch (error) {
//     throw error
//   }
// }

// DELETE
export const deleteUserByIdService = async id => {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new Error('User not found')
  return user
}

export const getMeService = async userId => {
  const user = await User.findById(userId).select('-password')
  if (!user) throw new Error('User not found')
  return user
}
