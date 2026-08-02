import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { signupService, signinService } from '../services/auth.service.js'

export const signup = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const { name, email, password, phone, gender, community } = req.body;
    
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

    const user = await signupService({
      name,
      email,
      password,
      phone,
      gender,
      community,
      file: req.file
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

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

    const user = await signinService({ email, password })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax'
    })

    res.json({
      success: true,
      user
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
