import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-50 to-blue-100 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
        Welcome to TaxEase
      </h1>
      <p className="max-w-xl text-gray-600 mb-8">
        Nigeria’s simple, reliable, and easy-to-use tax calculator and guide.
        Instantly estimate your income tax, understand rates, and make better
        financial decisions.
      </p>
      <div className="flex gap-4">
        <Link
          to="/calculator"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Calculate Tax
        </Link>
        <Link
          to="/guide"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Learn About Taxes
        </Link>
      </div>
    </section>
  );
};

export default Home;
