import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
 
import {
  getBlogById,
  toggleLikeBlog as likeBlog,
  addCommentToBlog as addComment,
  deleteBlogById as deleteBlog
} from "../api/blog.api";
  
const BlogDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    getBlogById(id)
      .then((res) => {
        setBlog(res.data.blog);
      })
      .catch(() => {
        setError("Failed to load blog");
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [id]);
    const isAuthor = blog?.author?._id === user?.id;


  const handleLike = async () => {
    try {
      const res = await likeBlog(id);
      setBlog((prev) => ({
        ...prev,
        likes: res.data.likes,
      }));
    } catch (err) {
      console.error("Like failed");
    }
  };
  const handleDelete = async () => {
  if (!window.confirm("Delete this blog?")) return;

  try {
    await deleteBlog(blog._id);
    navigate("/");
  } catch (err) {
    alert("Delete failed");
  }
};

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      const res = await addComment(id, { text: commentText });
      setBlog((prev) => ({
        ...prev,
        comments: res.data.comments,
      }));
      setCommentText("");
    } catch (err) {
      console.error("Comment failed");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading blog...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!blog) return null;

  const isLiked = blog.likes.includes(user?.id);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        {blog.photo && (
          <img
            src={blog.photo}
            alt={blog.title}
            className="w-full h-72 object-cover rounded mb-6"
          />
        )}

       {isAuthor && (
  <div className="flex gap-3 mb-4">
    
    {user && user.role === "admin" && (
      <button
      onClick={() => navigate(`/blogs/edit/${blog._id}`)}
      className="bg-yellow-500 text-white px-3 py-1 rounded"
    >
      Edit
    </button>
    ) }
      
    {user && user.role === "admin" && (
      <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
    )}
      
     
  </div>
)}
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

        <p className="text-sm text-gray-500 mb-4">
          Category: {blog.category}
        </p>

        <p className="text-gray-700 mb-6">{blog.description}</p>
         
        {/* LIKE BUTTON */}
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded text-white ${
            isLiked ? "bg-red-500" : "bg-blue-600"
          }`}
        >
          {isLiked ? "Unlike" : "Like"} ({blog.likes.length})
        </button>

        {/* COMMENTS */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>

          {blog.comments.length === 0 && (
            <p className="text-gray-500">No comments yet</p>
          )}

          <div className="space-y-4 mb-6">
            {blog.comments.map((comment, index) => (
              <div key={index} className="border p-3 rounded">
                <p className="text-gray-800">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* ADD COMMENT */}
          <form onSubmit={handleAddComment}>
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              type="submit"
              disabled={commentLoading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {commentLoading ? "Posting..." : "Add Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
