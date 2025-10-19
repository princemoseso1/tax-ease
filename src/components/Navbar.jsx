import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/taxease-logo.png"; // adjust filename if needed

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="TaxEase Logo" className="w-[70px] h-auto" /> {/* 👈 reduced size */}
          <span className="font-bold text-lg tracking-wide">TaxEase</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/tax-calculator" className="hover:text-gray-200 transition">Calculator</Link>
          <Link to="/resources" className="hover:text-gray-200 transition">Resources</Link>
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
        </div>

        {/* Mobile Menu Button (future enhancement) */}
        <div className="md:hidden">
          <button className="p-2 rounded-lg hover:bg-blue-800 transition">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
