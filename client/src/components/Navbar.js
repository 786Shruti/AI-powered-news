import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">NewsApp</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">About</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {open && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-2 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600" onClick={() => setOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-blue-600" onClick={() => setOpen(false)}>Dashboard</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
