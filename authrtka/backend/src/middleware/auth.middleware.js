import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    console.log("Authenticated user ID:", req.userId)
    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
}




export const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1]; // 👈 fallback

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};






// import jwt from "jsonwebtoken"

// export const requireAuth = (req, res, next) => {
//   const token = req.cookies?.token

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Not authenticated",
//     })
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decoded // { userId }
//     next()
//   } catch (err) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid token",
//     })
//   }
// }