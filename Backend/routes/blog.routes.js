/** @format */

import express from "express";
import auth from "../middleware/auth.middleware.js";
import multer from "multer";
import {
	createBlog,
	getBlogs,
	getMyBlogs,
	updateBlog,
	deleteBlog,
} from "../controllers/blog.controller.js";

const upload = multer();

const router = express.Router();

router.get("/", getBlogs);
router.get("/my", auth, getMyBlogs);
router.post("/", auth, upload.none(), createBlog);
router.put("/:id", auth, upload.none(), updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
