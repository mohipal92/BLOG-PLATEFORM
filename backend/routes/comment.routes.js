// routes/comment.routes.js

import express from "express";
import { getComments, addComment, deleteComment } from "../controllers/comment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:blogId", getComments);                   // Public: view comments
router.post("/:blogId", protect, addComment);          // Logged-in: post comment
router.delete("/:commentId", protect, deleteComment);  // Owner/Admin: delete comment

export default router;
