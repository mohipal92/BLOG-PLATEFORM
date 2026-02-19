import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, searchBlogs } from "../api/blog.api";

export const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // 🔹 Load ALL blogs initially
  const loadAllBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setBlogs(res.data.blogs);
    } catch {
      console.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Search blogs only when user wants
  const handleSearch = async () => {
    // if no search input → show all blogs again
    if (!keyword.trim() && category === "All") {
      loadAllBlogs();
      return;
    }

    setLoading(true);
    try {
      const res = await searchBlogs({
        keyword,
        category,
      });
      setBlogs(res.data.blogs);
    } catch {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // load all blogs on first render
  useEffect(() => {
    loadAllBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Explore Blogs</h1>
          <p className="opacity-90">
            Search blogs by keyword or category
          </p>
        </div>
      </section>

      {/* SEARCH & FILTER */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="flex-1 border p-2 rounded"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Technology</option>
            <option>Health</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Education</option>
            <option>Lifestyle</option>
            <option>Finance</option>
            <option>Entertainment</option>
            <option>Sports</option>
            <option>Other</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* BLOG LIST */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs found
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded shadow"
              >
                {blog.photo && (
                  <img
                    src={blog.photo}
                    alt={blog.title}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                )}

                <h2 className="text-xl font-semibold mb-2">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-3">
                  {blog.description.slice(0, 100)}...
                </p>

                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
