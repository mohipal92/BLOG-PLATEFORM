import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          BlogPlatform
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
           {
            user && user.role === "admin" && (
              <Link to="/create-blog" className="text-gray-700 hover:text-blue-600">
                Create
              </Link>
            )
          }
          <Link to="/blogs" className="text-gray-700 hover:text-blue-600">
            Blogs
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              {/* USER BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {user.fullname.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user.fullname.split(" ")[0]}
                </span>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 top-12 w-40 bg-white border rounded-lg shadow-md overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
