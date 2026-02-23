// controllers/comment.controller.js
// Add, get, and delete comments on blog posts

import Comment from "../models/Comment.model.js";
import Blog from "../models/Blog.model.js";

// ─── GET /api/comments/:blogId ────────────────────────────────────────────────
// Get all comments for a specific blog
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("author", "name avatar") // include author name
      .sort({ createdAt: -1 });          // newest first

    res.status(200).json({ count: comments.length, comments });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments.", error: err.message });
  }
};

// ─── POST /api/comments/:blogId ──────────────────────────────────────────────
// Add a comment to a blog (any logged-in user)
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment cannot be empty." });

    // Check blog exists
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    const comment = await Comment.create({
      content,
      blog: req.params.blogId,
      author: req.user._id,
    });

    // Populate author info before returning
    await comment.populate("author", "name avatar");

    res.status(201).json({ message: "Comment added!", comment });
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment.", error: err.message });
  }
};

// ─── DELETE /api/comments/:commentId ─────────────────────────────────────────
// Delete a comment — only the comment author OR admin can delete
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found." });

    // Check: is the logged-in user the comment author or an admin?
    const isOwner = comment.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "You cannot delete this comment." });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete comment.", error: err.message });
  }
};
