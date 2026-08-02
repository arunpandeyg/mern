import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import { signupService, signinService } from '../services/auth.service.js'
import generateTokenAndSetCookie from '../utils/generate.token.js'

export const signup = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const { name, email, password, gender, phone, role } = req.body

    if (!name || !email || !password || !gender || !phone || !role) {
      throw new Error('All fields are required')
    }

    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters long')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await signupService({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      role,
      file: req.file
    })

    const token = generateTokenAndSetCookie(user, res)

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

// SIGNIN
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('SIGNIN BODY:', req.body)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await signinService({ email, password })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({
      success: true,
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image
      }
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

// SIGNOUT
export const signout = (req, res) => {
  res.clearCookie('token')

  res.json({
    success: true,
    message: 'Logged out'
  })
}

export const updateProfileImage = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!req.file) {
    return res.status(400).json({ message: 'Image required' })
  }

  // delete old image
  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id)
  }

  // upload new
  const uploaded = await uploadImage(req.file.buffer, 'profiles')

  user.image = {
    url: uploaded.secure_url,
    public_id: uploaded.public_id
  }

  await user.save()

  res.json(user)
}

