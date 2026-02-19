import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blog.api";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Technology");
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    if (photo) {
      formData.append("photo", photo);
    }

    setLoading(true);
    try {
      await createBlog(formData);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create blog"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-xl"
      >
        <h1 className="text-2xl font-bold mb-5 text-center">
          Create New Blog
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* TITLE */}
        <input
          type="text"
          placeholder="Blog title"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Blog description"
          rows={6}
          className="w-full border p-2 mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          className="w-full border p-2 mb-4 rounded"
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

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
