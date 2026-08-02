import express from "express";
import {
  signup,
  signin,
  signout,
  getAllUsers,
  getUser,
  getMe,
  deleteUser,
  updateUser,
  changeName,
  changeRole,
  blockAccount,
  unblockAccount,
  refresh,
} from "../controllers/auth.controller.js";
import { protect, authorize } from "../middileware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", protect, signout);

router.get("/", getAllUsers);
router.get("/user", getUser);
router.delete("/user", protect, authorize("ADMIN"), deleteUser);
router.put("/user", protect, authorize("ADMIN"), updateUser);
router.put("/user/name", protect, authorize("ADMIN"), changeName);
router.put("/user/role", protect, authorize("ADMIN"), changeRole);
router.put("/user/block", protect, authorize("ADMIN"), blockAccount);
router.put("/user/unblock", protect, authorize("ADMIN"), unblockAccount);
router.post('/refresh', refresh);

router.get("/me", protect, getMe);

router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin access" });
});

export default router;
