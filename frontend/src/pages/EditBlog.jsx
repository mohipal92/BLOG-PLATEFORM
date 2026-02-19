import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlogById } from "../api/blog.api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        const blog = res.data.blog;
        setTitle(blog.title);
        setDescription(blog.description);
        setCategory(blog.category);
      })
      .catch(() => setError("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (photo) formData.append("photo", photo);

    try {
      await updateBlogById(id, formData);
      navigate(`/blogs/${id}`);
    } catch {
      setError("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border p-2 mb-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
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

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
