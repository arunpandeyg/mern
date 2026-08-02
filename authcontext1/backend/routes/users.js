import express from "express";
import { verifyRole, verifyToken } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getProfile,
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, verifyRole("admin"), getUsers);
router.delete("/:id", verifyToken, verifyRole("admin"), deleteUser);
router.get("/me", verifyToken, getProfile);

router.get("/:id", verifyToken, verifyRole("admin"), getUserById);
router.post("/", verifyToken, verifyRole("admin"), createUser);
router.put("/:id", verifyToken, verifyRole("admin"), updateUser);
export default router;
