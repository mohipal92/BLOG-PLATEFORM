// src/components/BlogCard.jsx
// Displays a single blog post preview in the listing grid

import { Link } from "react-router-dom";

// Helper: format date nicely e.g. "Feb 23, 2026"
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });

const BlogCard = ({ blog }) => {
  return (
    <article className="bg-white border border-ink-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Cover Image */}
      <Link to={`/blogs/${blog._id}`}>
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-48 object-cover hover:opacity-95 transition-opacity"
        />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="text-xs text-ink-400">{formatDate(blog.createdAt)}</span>
        </div>

        {/* Title */}
        <Link to={`/blogs/${blog._id}`}>
          <h2 className="font-display text-lg font-bold text-ink-900 hover:text-accent mb-2 line-clamp-2 leading-snug">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-ink-500 line-clamp-3 flex-1 mb-4 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-ink-50 border border-ink-200 text-ink-500 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Author + Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <span className="text-xs text-ink-400">by {blog.author?.name || "Admin"}</span>
          <div className="flex items-center gap-3 text-xs text-ink-400">
            <span>👁 {blog.views}</span>
            <span>❤️ {blog.likes?.length || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
