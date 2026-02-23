// src/pages/AdminDashboard.jsx
// Admin panel: Create, Edit, Delete blog posts

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api.js";
import toast from "react-hot-toast";

const CATEGORIES = ["Technology", "Lifestyle", "Travel", "Food", "Health", "Education", "Other"];

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  coverImage: "",
  category: "Technology",
  tags: "",        // comma-separated string in UI, converted to array on submit
  isPublished: true,
};

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      // Fetch ALL blogs (including unpublished) for admin view
      const res = await api.get("/blogs");
      setBlogs(res.data.blogs);
    } catch { toast.error("Failed to load blogs"); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const openCreate = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      coverImage: blog.coverImage || "",
      category: blog.category,
      tags: blog.tags?.join(", ") || "", // Array → comma string for input
      isPublished: blog.isPublished,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Convert tags string "react, js, mern" → array ["react", "js", "mern"]
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, payload);
        toast.success("Blog updated!");
      } else {
        await api.post("/blogs", payload);
        toast.success("Blog created!");
      }
      setShowForm(false);
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This will also delete all its comments.`)) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog deleted!");
      fetchBlogs();
    } catch { toast.error("Failed to delete"); }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl font-bold text-ink-900">Admin Dashboard</h1>
        <button
          onClick={openCreate}
          className="bg-accent hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          + New Post
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Posts", value: blogs.length },
          { label: "Published", value: blogs.filter((b) => b.isPublished).length },
          { label: "Total Likes", value: blogs.reduce((s, b) => s + b.likes.length, 0) },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-ink-100 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="text-sm text-ink-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ─── Create/Edit Form Modal ─────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-display text-xl font-bold mb-5">
              {editingBlog ? "Edit Blog Post" : "Create New Post"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">Title *</label>
                <input
                  type="text" name="title" value={form.title} onChange={handleChange} required
                  placeholder="Your blog title..."
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Category + Published row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-ink-700 mb-1">Category *</label>
                  <select
                    name="category" value={form.category} onChange={handleChange}
                    className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-sm text-ink-700 cursor-pointer">
                    <input
                      type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange}
                      className="w-4 h-4 accent-orange-500"
                    />
                    Published
                  </label>
                </div>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">Cover Image URL</label>
                <input
                  type="url" name="coverImage" value={form.coverImage} onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Tags <span className="text-ink-400 font-normal">(comma separated)</span>
                </label>
                <input
                  type="text" name="tags" value={form.tags} onChange={handleChange}
                  placeholder="react, javascript, mern"
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Excerpt <span className="text-ink-400 font-normal">(auto-generated if left blank)</span>
                </label>
                <textarea
                  name="excerpt" value={form.excerpt} onChange={handleChange} rows={2}
                  placeholder="Short description shown in listing..."
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              {/* Content — supports basic HTML */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1">
                  Content * <span className="text-ink-400 font-normal">(HTML supported: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;blockquote&gt;, etc.)</span>
                </label>
                <textarea
                  name="content" value={form.content} onChange={handleChange} required rows={12}
                  placeholder="<p>Start writing your blog post here...</p>&#10;<h2>A Section Heading</h2>&#10;<p>More content...</p>"
                  className="w-full border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-y font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit" disabled={submitting}
                  className="flex-1 bg-accent hover:bg-orange-700 disabled:bg-orange-300 text-white py-2.5 rounded-xl font-semibold text-sm"
                >
                  {submitting ? "Saving..." : editingBlog ? "Update Post" : "Publish Post"}
                </button>
                <button
                  type="button" onClick={() => setShowForm(false)}
                  className="flex-1 bg-ink-50 hover:bg-ink-100 text-ink-700 py-2.5 rounded-xl font-semibold text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Blogs Table ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-ink-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink-50 text-ink-500 border-b border-ink-100">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Views</th>
              <th className="text-left px-4 py-3">Likes</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-50">
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-ink-50">
                <td className="px-4 py-3 font-medium text-ink-900 max-w-xs truncate">
                  <Link to={`/blogs/${blog._id}`} className="hover:text-accent">{blog.title}</Link>
                </td>
                <td className="px-4 py-3 text-ink-500">{blog.category}</td>
                <td className="px-4 py-3 text-ink-400 text-xs">{formatDate(blog.createdAt)}</td>
                <td className="px-4 py-3 text-ink-500">{blog.views}</td>
                <td className="px-4 py-3 text-ink-500">{blog.likes.length}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${blog.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <button onClick={() => openEdit(blog)} className="text-blue-500 hover:text-blue-700 font-medium">Edit</button>
                  <button onClick={() => handleDelete(blog._id, blog.title)} className="text-red-400 hover:text-red-600 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <div className="text-center py-12 text-ink-400">No posts yet. Click "New Post" to get started.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
