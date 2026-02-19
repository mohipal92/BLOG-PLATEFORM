import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuthorBlog , deleteBlogById } from "../api/blog.api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getAuthorBlog(user._id || user.id)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch(() => {
        console.error("Failed to load user blogs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlogById(id);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* USER INFO */}
        <div className="bg-white p-6 rounded shadow mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {user.fullname}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* USER BLOGS */}
        <h2 className="text-2xl font-semibold mb-4">
          My Blogs
        </h2>

        {blogs.length === 0 && (
          <p className="text-gray-500">
            You haven’t created any blogs yet.
          </p>
        )}

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

              <h3 className="text-xl font-semibold mb-2">
                {blog.title}
              </h3>

              <p className="text-gray-600 mb-4">
                {blog.description.slice(0, 100)}...
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/blogs/edit/${blog._id}`)
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
