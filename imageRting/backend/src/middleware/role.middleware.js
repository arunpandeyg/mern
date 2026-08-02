// FILE: src/middleware/role.middleware.js
module.exports = function (roles = []) {
  if (typeof roles === "string") roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.length || roles.includes(req.user.role)) return next();
    return res.status(403).json({ message: "Forbidden" });
  };
};

// backend/src/middleware/role.middleware.js
const role4 = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient rights" });
    }
    next();
  };
};

module.exports = { role4 };
