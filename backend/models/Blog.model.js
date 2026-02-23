// models/Blog.model.js
// Schema for a blog post

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      // URL-friendly version of title e.g. "my-first-blog-post"
      type: String,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      // Short preview shown in blog listing
      type: String,
      maxlength: 300,
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    },
    category: {
      type: String,
      required: true,
      enum: ["Technology", "Lifestyle", "Travel", "Food", "Health", "Education", "Other"],
    },
    tags: [{ type: String }],  // Array of tag strings e.g. ["react", "javascript"]

    // Reference to the user who wrote this blog (must be admin)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array of user IDs who liked this post
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    isPublished: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ─── Auto-generate slug from title before saving ──────────────────────────────
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    // Convert "My Blog Post!" → "my-blog-post"
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")    // remove special chars
      .replace(/\s+/g, "-")            // spaces → hyphens
      .trim();
  }

  // Auto-generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.replace(/<[^>]*>/g, "").substring(0, 250) + "...";
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
