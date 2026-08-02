import jwt from "jsonwebtoken"

export const requireAuth = async (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user =  await User.findById(decoded.id).select("-password")
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
}

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" })
  }
  next()
}





// import jwt from "jsonwebtoken";
// import User from "../models/User.model.js";

// export const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies["jwt-auth"];

// 		if (!token) {
// 			return res.status(401).json({ message: "Unauthorized - No Token Provided" });
// 		}

// 		const decoded = jwt.verify(token, process.env.JWT_SECRET);
// 		if (!decoded) {
// 			return res.status(401).json({ message: "Unauthorized - Invalid Token" });
// 		}

// 		const user = await User.findById(decoded.userId).select("-password");

// 		if (!user) {
// 			return res.status(401).json({ message: "User not found" });
// 		}

// 		req.user = user;

// 		next();
// 	} catch (error) {
// 		console.log("Error in protectRoute middleware:", error.message);
// 		res.status(500).json({ message: "Internal server error" });
// 	}
// };