import express from "express"
import { signin, signout, signup } from "../controllers/auth.controller.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.post("/signup", upload.single("image"), signup)
router.post("/signin", signin)
router.post("/signout", signout)

export default router










// import express from 'express';
// import { signup, signin, signout } from '../controllers/auth.controller.js';
// import { imageUpload, uploadImage } from '../onhold/imageUpload.controller.js';

// const router = express.Router();

// router.post('/image', imageUpload, uploadImage);

// router.post('/signup', signup);
// router.post('/signin', signin);
// router.get('/signout', signout);

// export default router;