import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          TaxEase
        </Link>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/calculator" className="hover:text-blue-200">
            Tax Calculator
          </Link>
          <Link to="/guide" className="hover:text-blue-200">
            Tax Guide
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
