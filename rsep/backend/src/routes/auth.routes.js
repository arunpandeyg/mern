import express from "express"
import { signin, signout, signup } from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/signup", upload.single("image"), signup)
router.post("/signin", signin)
router.post("/signout", signout)

export default router

