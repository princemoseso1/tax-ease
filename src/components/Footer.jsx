import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6 mt-[100px]"> {/* 👈 added 100px top margin */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-semibold text-lg">TaxEase – Nigeria’s Smart Tax Assistant</p>
        <p className="text-sm mt-1">
          Helping Nigerians and businesses understand and manage taxes better.
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-300">Terms of Use</a>
          <a href="/disclaimer" className="hover:text-gray-300">Disclaimer</a>
        </div>
        <p className="text-xs text-gray-300 mt-3">
          © {new Date().getFullYear()} TaxEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
