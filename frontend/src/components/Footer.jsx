 import React from 'react'
 
 export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            BlogPlatform
          </h2>
          <p className="text-sm text-gray-400">
            A modern blogging platform to read, write, and share
            ideas with the world.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              Home
            </li>
            <li className="hover:text-white cursor-pointer">
              Create Blog
            </li>
            <li className="hover:text-white cursor-pointer">
              Profile
            </li>
          </ul>
        </div>

        {/* CONTACT / INFO */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            About
          </h3>
          <p className="text-sm text-gray-400">
            Built using MERN stack with authentication, image
            uploads, likes, comments, and advanced search.
          </p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} BlogPlatform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
