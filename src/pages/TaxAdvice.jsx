// src/pages/TaxAdvice.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg mb-4 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-3 bg-green-100 hover:bg-green-200 transition text-left"
      >
        <span className="text-lg font-semibold text-green-700">{title}</span>
        <span className="text-green-600 text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="p-5 text-gray-700 bg-white">{children}</div>}
    </div>
  );
};

const TaxAdvice = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Tax Advice & Compliance
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          Stay informed and compliant with the 2025 Nigerian Tax Act.  
          Tap on each section below to learn about your obligations, available incentives, and compliance requirements.
        </p>

        {/* Accordion 1: Personal Tax */}
        <AccordionItem title="💼 Personal Income Tax (PIT) Compliance">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Register your Tax Identification Number (TIN) with your State IRS
              or FIRS if you earn income in multiple states.
            </li>
            <li>File annual tax returns before <b>31st March</b> every year.</li>
            <li>
              Keep receipts of allowable deductions such as pension, NHF, life
              insurance, and donations to approved charities.
            </li>
            <li>
              Use your Pay-As-You-Earn (PAYE) records to confirm correct
              remittance by your employer.
            </li>
            <li>
              For self-employed individuals, declare income honestly and maintain
              business expense records.
            </li>
          </ul>
        </AccordionItem>

        {/* Accordion 2: Company Tax */}
        <AccordionItem title="🏢 Company Income Tax (CIT) Compliance">
          <ul className="list-disc list-inside space-y-2">
            <li>Register for a company TIN immediately after CAC incorporation.</li>
            <li>
              File annual CIT returns within <b>6 months</b> of your company’s
              financial year-end.
            </li>
            <li>
              Maintain proper financial statements in line with IFRS and
              Nigerian accounting standards.
            </li>
            <li>
              Ensure withholding tax (WHT) and Value Added Tax (VAT) are correctly
              deducted and remitted.
            </li>
            <li>
              Small companies (turnover under ₦25m) are exempt from CIT but must
              still file returns.
            </li>
          </ul>
        </AccordionItem>

        {/* Accordion 3: Tax Holidays */}
        <AccordionItem title="🌴 Tax Holidays & Incentives">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Pioneer Status Incentive (PSI):</b> Grants 3–5 years tax
              holiday to qualifying industries under the Industrial Development
              (Income Tax Relief) Act.
            </li>
            <li>
              <b>Export Expansion Grant (EEG):</b> Encourages exporters of
              Nigerian goods.
            </li>
            <li>
              <b>Research & Development (R&D):</b> Deductions for qualifying R&D
              expenses.
            </li>
            <li>
              <b>Public Infrastructure Investment:</b> Tax credits for companies
              investing in roads and infrastructure.
            </li>
            <li>
              <b>Agricultural & Rural Development Incentives:</b> Reduced or
              exempt CIT for farming and agro-allied businesses.
            </li>
          </ul>
        </AccordionItem>

        {/* Accordion 4: FAQs */}
        <AccordionItem title="❓ Quick FAQs">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Can I pay tax for my company online? — Yes, via{" "}
              <a
                href="https://www.firs.gov.ng"
                target="_blank"
                rel="noreferrer"
                className="text-green-700 underline"
              >
                FIRS TaxPro Max
              </a>.
            </li>
            <li>
              Do freelancers pay tax? — Yes, under Personal Income Tax based on
              net income after reliefs.
            </li>
            <li>
              Can I claim rent or personal loans as deductions? — No, domestic or
              private expenses are non-deductible.
            </li>
            <li>
              What if I miss a filing deadline? — Late filing attracts penalties
              and interest on unpaid taxes.
            </li>
          </ul>
        </AccordionItem>

        <div className="mt-10 text-center">
          <Link
            to="/tax-calculator"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Calculate Your Tax
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TaxAdvice;
