// FILE: src/controllers/auth.controller.js
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    fullName,
    email,
    password,
    phoneNumber,
    birthdate,
    religion,
    country,
    state,
    district,
  } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    passwordHash,
    phoneNumber,
    birthdate,
    religion,
    country,
    state,
    district,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(201).json({
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
  });
};

exports.signout = (req, res) => {

 try {
    req.user = null;

    res.json({ message: "Signed out" });
  } catch (error) {
    console.error("Signout error:", error.message);
    res.status(500).json({ message: "Signout error" });
  }
 
};

exports.getMe = async (req, res) => {
  const user = req.user;
  res.json({ user });
};
