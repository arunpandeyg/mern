const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const auth4 = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth4 };
const auth3 = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {auth3, auth4 };






// // FILE: src/middleware/auth.middleware.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");

// const auth4 = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     res.status(401).json({ message: "Token is not valid" });
//   }
// };

// module.exports = { auth4 };

// module.exports = async function (req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer "))
//     return res.status(401).json({ message: "Unauthorized" });
//   const token = authHeader.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(payload.id).select("-passwordHash");
//     if (!user) return res.status(401).json({ message: "Unauthorized" });
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };
