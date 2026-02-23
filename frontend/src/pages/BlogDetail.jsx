// src/pages/BlogDetail.jsx
// Full blog post view with like button and comment section

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

const BlogDetail = () => {
  const { id } = useParams(); // get blog ID from URL
  const { user, isLoggedIn } = useAuth();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Fetch blog and comments on mount
  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/blogs/${id}`);
      const b = res.data.blog;
      setBlog(b);
      setLikeCount(b.likes.length);
      // Check if current user already liked this post
      if (user) setLiked(b.likes.includes(user.id));
    } catch {
      toast.error("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data.comments);
    } catch {
      console.error("Failed to load comments");
    }
  };

  // ─── Toggle Like ──────────────────────────────────────────────────────────
  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("Login to like posts");
      return;
    }
    try {
      const res = await api.post(`/blogs/${id}/like`);
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch {
      toast.error("Failed to update like");
    }
  };

  // ─── Submit Comment ───────────────────────────────────────────────────────
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.post(`/comments/${id}`, { content: commentText });
      setComments([res.data.comment, ...comments]); // prepend new comment
      setCommentText("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Delete Comment ───────────────────────────────────────────────────────
  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  if (loading) return <div className="text-center py-24 text-ink-400">Loading...</div>;
  if (!blog) return <div className="text-center py-24 text-ink-400">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      {/* ─── Back Link ─────────────────────────────────────────────────────── */}
      <Link to="/blogs" className="text-sm text-accent hover:underline mb-6 inline-block">
        ← Back to all posts
      </Link>

      {/* ─── Hero Image ────────────────────────────────────────────────────── */}
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-xl mb-8"
      />

      {/* ─── Meta ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          {blog.category}
        </span>
        <span className="text-xs text-ink-400">{formatDate(blog.createdAt)}</span>
        <span className="text-xs text-ink-400">by {blog.author?.name}</span>
        <span className="text-xs text-ink-400">👁 {blog.views} views</span>
      </div>

      {/* ─── Title ─────────────────────────────────────────────────────────── */}
      <h1 className="font-display text-4xl font-bold text-ink-900 leading-tight mb-6">
        {blog.title}
      </h1>

      {/* ─── Content ───────────────────────────────────────────────────────── */}
      {/* dangerouslySetInnerHTML renders HTML string from admin's content */}
      <div
        className="blog-content text-lg text-ink-700 leading-8 mb-8"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* ─── Tags ──────────────────────────────────────────────────────────── */}
      {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map((tag) => (
            <span key={tag} className="bg-ink-50 border border-ink-200 text-ink-500 px-3 py-1 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ─── Like Button ───────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 py-6 border-y border-ink-100 mb-10">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
            liked
              ? "bg-red-50 border-red-300 text-red-500"
              : "border-ink-200 text-ink-500 hover:border-red-300 hover:text-red-400"
          }`}
        >
          {liked ? "❤️" : "🤍"} {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </button>
        {!isLoggedIn && (
          <span className="text-sm text-ink-400">
            <Link to="/login" className="text-accent hover:underline">Login</Link> to like or comment
          </span>
        )}
      </div>

      {/* ─── Comments Section ──────────────────────────────────────────────── */}
      <section>
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-6">
          Comments ({comments.length})
        </h2>

        {/* Comment Form — only shown when logged in */}
        {isLoggedIn && (
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              maxLength={500}
              className="w-full border border-ink-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-ink-400">{commentText.length}/500</span>
              <button
                type="submit"
                disabled={submitting || !commentText.trim()}
                className="bg-accent hover:bg-orange-700 disabled:bg-orange-300 text-white px-5 py-2 rounded-lg text-sm font-semibold"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>
        )}

        {/* Comment List */}
        {comments.length === 0 ? (
          <p className="text-ink-400 text-sm py-4">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white border border-ink-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-semibold text-sm text-ink-900">
                      {comment.author?.name}
                    </span>
                    <span className="text-xs text-ink-400 ml-2">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  {/* Show delete button only to the comment author or admin */}
                  {user && (user.id === comment.author?._id || user.role === "admin") && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="text-sm text-ink-600 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogDetail;
