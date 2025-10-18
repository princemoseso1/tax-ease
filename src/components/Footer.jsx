import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} TaxEase. All rights reserved.</p>
        <p className="text-sm mt-1">Making Nigerian tax calculation simple and easy.</p>
      </div>
    </footer>
  );
};

export default Footer;
