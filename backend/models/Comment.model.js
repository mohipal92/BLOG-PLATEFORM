// models/Comment.model.js
// Each comment belongs to a blog post and a user

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment cannot be empty"],
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },

    // Which blog post this comment belongs to
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    // Which user wrote this comment
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
