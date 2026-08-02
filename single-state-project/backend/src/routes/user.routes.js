import express from "express";
import {
  createUser,
  currentUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getUsers);
router.get("/:id", protectRoute, getUserById);
router.post("/create", protectRoute, createUser);
router.put("/:id", protectRoute, updateUser);
router.delete("/:id", protectRoute, deleteUser);
router.get("/current", protectRoute, currentUser);

export default router;
