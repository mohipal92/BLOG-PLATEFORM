// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex items-center justify-center px-4">
      <div className="bg-white border border-ink-200 rounded-2xl p-8 w-full max-w-md shadow-sm">
        <h2 className="font-display text-2xl font-bold text-ink-900 mb-1">Welcome back</h2>
        <p className="text-ink-400 text-sm mb-6">Log in to like and comment on posts</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", placeholder: "••••••••" },
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-ink-400 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
