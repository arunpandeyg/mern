import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { signupService, signinService } from "../services/auth.service.js";
import generateTokenAndSetCookie from "../utils/generate.token.js";

export const signup = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, email, password, gender, phone, role } = req.body;

    if (!name || !email || !password || !gender || !phone || !role) {
      throw new Error("All fields are required");
    }

    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await signupService({
      name,
      email,
      password: hashedPassword,
      gender,
      phone,
      role,
      file: req.file,
    });

    const token = generateTokenAndSetCookie(user, res);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,			
			name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
			role: user.role,
      image: user.image
		});
	} catch (error) {
		console.log("Error in signin controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



// SIGNIN
// export const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("SIGNIN BODY:", req.body);
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await signinService({ email, password }); 

//     const token = generateTokenAndSetCookie(user, res);  
//     console.log("SIGNIN TOKEN:", token);
//     res.json({
//       success: true,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image: user.image,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// SIGNOUT
export const signout = (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out",
  });
};

export const updateProfileImage = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!req.file) {
    return res.status(400).json({ message: "Image required" });
  }

  // delete old image
  if (user.image?.public_id) {
    await cloudinary.uploader.destroy(user.image.public_id);
  }

  // upload new
  const uploaded = await uploadImage(req.file.buffer, "profiles");

  user.image = {
    url: uploaded.secure_url,
    public_id: uploaded.public_id,
  };

  await user.save();

  res.json(user);
};

// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendWelcomeEmail } from "../email/emailHandlers.js";
// import cloudinary from "../config/cloudinary.js";

// export const signup = async (req, res) => {
// 	console.log(req.body);
// 	try {
// 		const { name, email, password, phone, gender, role, image } = req.body;

// 		if (!name || !email || !password || !phone || !gender || !role || !image) {
// 			return res.status(400).json({ message: "All fields are required" });
// 		}
// 		const existingEmail = await User.findOne({ email });
// 		if (existingEmail) {
// 			return res.status(400).json({ message: "Email already exists" });
// 		}

// 		if (password.length < 6) {
// 			return res.status(400).json({ message: "Password must be at least 6 characters" });
// 		}

//         if (req.body.image) {
// 			const result = await cloudinary.uploader.upload(req.body.image);
// 			req.body.image = result.secure_url;
// 		}

// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);

// 		const user = new User({
// 			name,
// 			email,
// 			password: hashedPassword,
//             phone,
//             gender,
//             role,
//             image: req.body.image
// 		});

// 		await user.save();

// 		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

// 		res.cookie("jwt-linkedin", token, {
// 			httpOnly: true, // prevent XSS attack
// 			maxAge: 3 * 24 * 60 * 60 * 1000,
// 			sameSite: "strict", // prevent CSRF attacks,
// 			secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
// 		});

// 		res.status(201).json({ message: "User registered successfully" });

// 		const profileUrl = process.env.CLIENT_URL + "/profile/" + user.phone;

// 		try {
// 			await sendWelcomeEmail(user.email, user.name, profileUrl);
// 		} catch (emailError) {
// 			console.error("Error sending welcome Email", emailError);
// 		}
// 	} catch (error) {
// 		console.log("Error in signup: ", error.message);
// 		res.status(500).json({ message: "Internal server error" });
// 	}
// };

// export const signin = async (req, res) => {};
// export const signout = async (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Signed out successfully" });
// };
