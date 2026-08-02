import express from "express"
import {
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getMe,
  updateMyImage,
  createUser,
  searchUsers,
} from "../controllers/user.controller.js"
import { requireAuth } from "../middleware/auth.middleware.js"
import { requireRole } from "../middleware/role.middleware.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/", requireAuth, upload.single("image"), createUser)
router.get("/me", requireAuth, getMe)
router.get("/", requireAuth, getAllUsers)
router.get("/:id", requireAuth, getUserById)
router.put("/:id", requireAuth, upload.single("image"), updateUserById)
router.patch("/:id", requireAuth, updateUserById)
router.delete("/:id", requireAuth, deleteUserById)
router.get("/search", requireAuth, searchUsers)

router.delete(
  "/:id",
  requireAuth,
  requireRole("admin"),
  deleteUserById
)

router.put(
  "/me/image",
  requireAuth,
  upload.single("image"),
  updateMyImage
)

export default router