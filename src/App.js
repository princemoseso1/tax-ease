import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaxCalculator from "./pages/TaxCalculator";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow mt-[100px]"> {/* 👈 added 100px top margin */}
          <Routes>
            <Route path="/" element={<TaxCalculator />} />
            <Route path="/tax-calculator" element={<TaxCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
