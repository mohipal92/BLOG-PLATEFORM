import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../api/blog.api";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllBlogs()
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch(() => {
        setError("Failed to load blogs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          All Blogs
        </h1>

        {blogs.length === 0 && (
          <p className="text-center text-gray-500">
            No blogs available
          </p>
        )}

        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-5 rounded shadow"
            >
              {blog.photo && (
                <img
                  src={blog.photo}
                  alt={blog.title}
                  className="w-full h-60 object-cover rounded mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold mb-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-3">
                {blog.description.slice(0, 150)}...
              </p>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Category: {blog.category}
                </span>

                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
