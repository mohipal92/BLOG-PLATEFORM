// controllers/blog.controller.js
// Full CRUD + Like toggle + Search & Filter

import Blog from "../models/Blog.model.js";
import Comment from "../models/Comment.model.js";

// ─── GET /api/blogs ───────────────────────────────────────────────────────────
// List all published blogs with optional search, category filter, sort
export const getAllBlogs = async (req, res) => {
  try {
    const { search, category, tag, sort } = req.query;

    // Build filter query dynamically
    let query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] }; // blogs that contain this tag

    // Sort options
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === "popular") sortOption = { views: -1 };
    if (sort === "liked") sortOption = { likes: -1 };

    const blogs = await Blog.find(query)
      .sort(sortOption)
      .populate("author", "name avatar"); // replace author ID with name & avatar

    res.status(200).json({ count: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs.", error: err.message });
  }
};

// ─── GET /api/blogs/:id ───────────────────────────────────────────────────────
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name avatar bio");
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    // Increment view count every time the blog is opened
    blog.views += 1;
    await blog.save();

    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blog.", error: err.message });
  }
};

// ─── POST /api/blogs (Admin only) ────────────────────────────────────────────
export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, coverImage, category, tags, isPublished } = req.body;

    if (!title || !content || !category)
      return res.status(400).json({ message: "Title, content, and category are required." });

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      coverImage,
      category,
      tags: tags || [],
      isPublished: isPublished ?? true,
      author: req.user._id, // set author to the logged-in admin
    });

    res.status(201).json({ message: "Blog created!", blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog.", error: err.message });
  }
};

// ─── PUT /api/blogs/:id (Admin only) ─────────────────────────────────────────
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    res.status(200).json({ message: "Blog updated!", blog });
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog.", error: err.message });
  }
};

// ─── DELETE /api/blogs/:id (Admin only) ──────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    // Also delete all comments for this blog (clean up)
    await Comment.deleteMany({ blog: req.params.id });

    res.status(200).json({ message: "Blog deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog.", error: err.message });
  }
};

// ─── POST /api/blogs/:id/like (toggle like) ───────────────────────────────────
// If user already liked → unlike. If not liked → like.
export const toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found." });

    const userId = req.user._id;

    // Check if this user already liked the blog
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // Remove user from likes array (unlike)
      blog.likes = blog.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      // Add user to likes array (like)
      blog.likes.push(userId);
    }

    await blog.save();

    res.status(200).json({
      liked: !alreadyLiked,
      likeCount: blog.likes.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle like.", error: err.message });
  }
};
