/** @format */

import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
	getProfile,
	updateProfile,
	deleteProfile,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/me", auth, getProfile);
router.put("/update", auth, updateProfile);
router.post("/delete", auth, deleteProfile);
export default router;
