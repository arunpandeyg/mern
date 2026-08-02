import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

import cloudinary from "../config/cloudinary.js";

import jwt from "jsonwebtoken"
import { signupService, signinService, getAllUsersService, getUserByIdService, updateUserByIdService, deleteUserByIdService } from "../services/auth.service.js"

export const signup = async (req, res) => {
  try {
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)

    const { name, username, email, password } = req.body

    const user = await signupService({
      name,
      username,
      email,
      password,
      file: req.file,
    })

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.status(201).json({
      success: true,
      user,
      token,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}


// export const signup = async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body;
//     console.log(req.body);
//     if (!name || !username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const usernameExists = await User.findOne({ username });
//     if (usernameExists) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const file = req.file ? req.file.path : null;
//     try {
//       const result = await cloudinary.uploader.upload(file.path,{
//         folder: "users",
//       });
//       console.log(result);
//       req.body.file = result.secure_url;
//     } catch (error) {
//       // Handle the error here, e.g., log the error or return an error response
//       console.error("Error uploading image:", error);
//       // You can also set req.body.image to null or handle it in a way that suits your application logic
//       req.body.image = null;
//     }

//     // if (image) {
//     //   const userImage = await cloudinary.uploader.upload(image, {
//     //     folder: "users",
//     //   });
//     //   req.body.image = userImage.secure_url;
//     // } else {
//     //   req.body.image = null;
//     // }
//     const newUser = new User({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//       image,
//     });
//     if (newUser) {
//       generateTokenAndSetCookie(newUser._id, res);
//       await newUser.save({
//         name,
//         username,
//         email,
//         password: hashedPassword,
//         image,
//       });
//       res.json({
//         message: "Welcome Signup 👑",
//         user: {
//           name,
//           username,
//           email,
//           image,
//           _id: newUser._id,
//         },
//       });
//     } else {
//       res.status(500).json({ message: "Something went wrong" });
//     }
//   } catch (error) {
//     console.log("Error in signup controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await signinService(email, password);
    generateTokenAndSetCookie(user._id, res);
    res.json({
      message: "Welcome Signin 👑",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        image: user.image,
        _id: user._id,
      },
    });
    
  } catch (error) {
    console.log("Error in signin controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const signout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.json({ message: "Signout successful" });
  } catch (error) {
    console.log("Error in signout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.image,
      _id: user._id,
    });
  } catch (error) {
    console.log("Error in profile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, username, email, image } = req.body;
    const updatedUser = await updateProfileService(userId, name, username, email, image);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateName = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const updatedUser = await updateNameService(userId, name);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateName controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUsername = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username } = req.body;
    const updatedUser = await updateUsernameService(userId, username);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateUsername controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const userId = req.user && req.user._id ? req.user._id : null;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, username, email, image } = req.body;
    const updatedUser = await updateUserByIdService(userId, name, username, email, image);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const updateEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;
    const updatedUser = await updateEmailService(userId, email);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateEmail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { password } = req.body;
    const updatedUser = await updatePasswordService(userId, password);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updatePassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { image } = req.body;
    const updatedUser = await updateImageService(userId, image);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateImage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedUser = await deleteAccountService(userId);
    res.json(deletedUser);
  } catch (error) {
    console.log("Error in deleteAccount controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserByIdService(userId);
    res.json(user);
  } catch (error) {
    console.log("Error in getUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, username, email, image } = req.body;
    const updatedUser = await updateUserByIdService(userId, name, username, email, image);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error in updateUser controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUserByIdService(userId);
    res.json(deletedUser);
  } catch (error) {
    console.log("Error in deleteUserById controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await getUserByUsernameService(username);
    res.json(user);
  } catch (error) {
    console.log("Error in getUserByUsername controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailService(email);
    res.json(user);
  } catch (error) {
    console.log("Error in getUserByEmail controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await getProfileService(userId);
    res.json(user);
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { name, username, email, image } = req.body;
//     const updatedUser = await updateProfileService(userId, name, username, email, image);
//     res.json(updatedUser);
//   } catch (error) {
//     console.log("Error in updateProfile controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const updateName = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { name } = req.body;
//     const updatedUser = await updateNameService(userId, name);
//     res.json(updatedUser);
//   } catch (error) {
//     console.log("Error in updateName controller", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
