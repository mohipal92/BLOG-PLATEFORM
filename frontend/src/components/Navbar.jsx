// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-ink-200">
      {/* Top strip */}
      <div className="bg-ink-900 text-white text-center text-xs py-1.5 tracking-widest uppercase">
        ✍️ The Blog — Ideas Worth Reading
      </div>

      <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold text-ink-900 tracking-tight">
          The <span className="text-accent">Blog</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/blogs" className="text-ink-500 hover:text-accent transition-colors">
            All Posts
          </Link>

          {isAdmin && (
            <Link to="/admin" className="text-ink-500 hover:text-accent transition-colors">
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-ink-400 text-xs">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="border border-ink-200 hover:border-accent text-ink-600 hover:text-accent px-3 py-1.5 rounded text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-ink-500 hover:text-accent px-3 py-1.5 text-sm">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-accent hover:bg-orange-700 text-white px-4 py-1.5 rounded text-sm font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
