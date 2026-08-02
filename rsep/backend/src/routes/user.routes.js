import express from "express"
import {
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getMe,
} from "../controllers/user.controller.js"
import { requireAuth, adminOnly } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.js"
import { updateMyImage } from "../controllers/user.controller.js"
import { requireRole } from "../middleware/role.middleware.js"
import { updateProfileImage } from "../controllers/auth.controller.js"



const router = express.Router()

router.get("/", requireAuth, adminOnly, getAllUsers)
router.get("/:id", requireAuth, adminOnly, getUserById)
router.put("/:id", requireAuth, adminOnly, updateUserById)
router.delete("/:id", requireAuth, adminOnly, requireRole("admin"), deleteUserById)

router.get("/me", requireAuth, getMe)



router.put(
  "/me/image",
  requireAuth,
  upload.single("image"),
  updateMyImage
)

router.put(
  "/users/me/image",
  requireAuth,
  upload.single("image"),
  updateProfileImage
)


export default router
