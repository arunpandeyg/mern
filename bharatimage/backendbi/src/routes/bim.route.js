import express from "express";
import {
  getBims,
  getBim,
  createBim,
  interactionCheck,
  interact,
} from "../controllers/Bim.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getBims);
router.get("/:id", getBim);
router.post("/", verifyToken, createBim);
router.get("/interaction-check/:id", interactionCheck);
router.post("/interact/:id",verifyToken, interact);

export default router;
