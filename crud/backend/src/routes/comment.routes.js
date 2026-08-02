import express from "express"
import {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
} from "../controllers/comment.controller.js"
import { requireAuth } from "../middleware/auth.middleware.js"
import { requireRole } from "../middleware/role.middleware.js"

const router = express.Router()

router.get("/", getAllComments)
router.get("/:id", getCommentById)
router.post("/", requireAuth, createComment)
router.put("/:id", requireAuth, updateComment)
router.delete("/:id", requireAuth, requireRole("admin"), deleteComment)

export default router