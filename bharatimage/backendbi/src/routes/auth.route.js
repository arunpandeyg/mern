import express from "express";
import { deleteUserById, getAllUsers, getUserByEmail, getUserById, signin, signout, signup, updateUserById } from "../controllers/auth.controller.js";
import  upload  from "../middlewares/multer.middleware.js";


const router = express.Router();

router.post("/signup", upload.single("image"),  signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:email", getUserByEmail);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);


export default router;
