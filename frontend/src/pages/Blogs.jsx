// src/pages/Blogs.jsx
// Lists all blog posts with search, category filter, and sort

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../utils/api.js";
import BlogCard from "../components/BlogCard.jsx";

const CATEGORIES = ["All", "Technology", "Lifestyle", "Travel", "Food", "Health", "Education", "Other"];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  // useSearchParams lets us read ?category=Technology from the URL
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    fetchBlogs();
  }, [category, sort]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "All") params.append("category", category);
      if (sort) params.append("sort", sort);

      const res = await api.get(`/blogs?${params.toString()}`);
      setBlogs(res.data.blogs);
    } catch {
      console.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-ink-900 mb-6">All Posts</h1>

      {/* ─── Filters ─────────────────────────────────────────────────────── */}
      <div className="bg-white border border-ink-200 rounded-xl p-4 mb-8 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 min-w-60">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-ink-200 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Search
          </button>
        </form>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-ink-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Viewed</option>
          <option value="liked">Most Liked</option>
        </select>
      </div>

      {/* ─── Blog Grid ───────────────────────────────────────────────────── */}
      {loading ? (
        <div className="text-center py-20 text-ink-400">Loading posts...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20 text-ink-400">
          <p className="text-xl mb-1">No posts found</p>
          <p className="text-sm">Try a different search or category</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-ink-400 mb-5">{blogs.length} post(s) found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
