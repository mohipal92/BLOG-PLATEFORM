// src/pages/Home.jsx
// Landing page — hero + latest 3 blogs preview

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api.js";
import BlogCard from "../components/BlogCard.jsx";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);

  useEffect(() => {
    // Fetch 3 latest blogs for homepage preview
    api.get("/blogs?sort=newest").then((res) => {
      setLatestBlogs(res.data.blogs.slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-ink-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-24 text-center">
          <p className="text-accent uppercase tracking-[0.3em] text-sm font-bold mb-4">
            Ideas · Stories · Perspectives
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            A Blog Worth<br />Reading
          </h1>
          <p className="text-ink-200 text-lg max-w-xl mx-auto mb-8">
            Thoughtful writing on technology, education, lifestyle, and everything in between.
          </p>
          <Link
            to="/blogs"
            className="inline-block bg-accent hover:bg-orange-700 text-white px-8 py-3 rounded font-semibold tracking-wide"
          >
            Explore All Posts →
          </Link>
        </div>
      </section>

      {/* ─── Latest Posts ─────────────────────────────────────────────────── */}
      {latestBlogs.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-ink-900">Latest Posts</h2>
            <Link to="/blogs" className="text-sm text-accent hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Categories Strip ─────────────────────────────────────────────── */}
      <section className="bg-white border-t border-ink-200 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="font-display text-xl font-bold text-center text-ink-700 mb-6">Browse by Topic</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Technology", "Lifestyle", "Education", "Travel", "Health", "Food"].map((cat) => (
              <Link
                key={cat}
                to={`/blogs?category=${cat}`}
                className="border border-ink-200 hover:border-accent hover:text-accent text-ink-600 px-4 py-2 rounded-full text-sm font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
