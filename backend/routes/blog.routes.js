// routes/blog.routes.js

import express from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleLike,
} from "../controllers/blog.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// User (logged in)
router.post("/:id/like", protect, toggleLike);

// Admin only
router.post("/", protect, adminOnly, createBlog);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
