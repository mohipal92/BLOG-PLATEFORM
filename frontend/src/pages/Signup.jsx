// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Signup = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      await signup(form.name, form.email, form.password);
      toast.success("Account created! Welcome 🎉");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center px-4">
      <div className="bg-white border border-ink-200 rounded-2xl p-8 w-full max-w-md shadow-sm">
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-1">Join The Blog</h2>
        <p className="text-ink-400 text-sm mb-6">Create an account to like and comment on posts</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "name", label: "Full Name", type: "text", placeholder: "Mohipal Kumar" },
            { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
            { name: "confirm", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-ink-700 mb-1">{f.label}</label>
              <input
                type={f.type}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                required
                placeholder={f.placeholder}
                className="w-full border border-ink-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-orange-700 disabled:bg-orange-300 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-ink-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
