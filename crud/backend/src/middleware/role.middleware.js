import User from "../models/user.model.js"

export const requireRole = (...roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.userId)

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      })
    }

    next()
  }
}