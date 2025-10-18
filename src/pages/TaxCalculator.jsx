// src/pages/TaxCalculator.jsx
import React, { useState } from "react";

/*
  TaxEase — TaxCalculator supporting:
  - Individual PIT (2025 brackets)
  - Company CIT (30% or 0% for small companies)
  - Development Levy (4% on assessable profits for companies except small and non-resident)
  - Effective tax rate check (if user opts-in as 'subject to ETR rule') and top-up to 15% where required
*/

const PIT_BRACKETS = [
  { upto: 800_000, rate: 0 },
  { upto: 3_000_000, rate: 0.15 },   // 800k + 2.2M = 3M
  { upto: 12_000_000, rate: 0.18 },  // +9M
  { upto: 25_000_000, rate: 0.21 },  // +13M
  { upto: 50_000_000, rate: 0.23 },  // +25M
  { upto: Infinity, rate: 0.25 },
];

function computePIT(taxable) {
  if (taxable <= 0) return 0;
  let remaining = taxable;
  let lastCut = 0;
  let tax = 0;
  for (let i = 0; i < PIT_BRACKETS.length; i++) {
    const bracket = PIT_BRACKETS[i];
    const upper = bracket.upto;
    const band = Math.max(0, Math.min(remaining, upper - lastCut));
    if (band > 0) {
      tax += band * bracket.rate;
      remaining -= band;
    }
    lastCut = upper;
    if (remaining <= 0) break;
  }
  return Math.max(0, Math.round(tax));
}

const TaxCalculator = () => {
  const [mode, setMode] = useState("individual"); // or "company"

  // Individual state
  const [annualIncome, setAnnualIncome] = useState("");

  // Company state
  const [assessableProfits, setAssessableProfits] = useState("");
  const [isSmallCompany, setIsSmallCompany] = useState(false);
  const [isNonResident, setIsNonResident] = useState(false);
  const [depreciation, setDepreciation] = useState(""); // user-entered depreciation
  const [personnelCost, setPersonnelCost] = useState(""); // user-entered personnel cost
  const [otherCoveredTaxes, setOtherCoveredTaxes] = useState(""); // e.g., other taxes that count toward aggregate covered tax
  const [subjectToETRRule, setSubjectToETRRule] = useState(false);

  // Results
  const [result, setResult] = useState(null);

  const handleCalculateIndividual = () => {
    const income = Number(annualIncome || 0);
    // NOTE: income is assumed taxable after reliefs for now
    const pit = computePIT(income);
    setResult({
      mode: "individual",
      taxableIncome: income,
      taxPayable: pit,
    });
  };

  const handleCalculateCompany = () => {
    const profits = Number(assessableProfits || 0);
    if (profits <= 0) {
      setResult({
        mode: "company",
        error: "Please enter assessable profits (number).",
      });
      return;
    }

    // Development levy: 4% on assessable profits except small & non-resident companies
    const developmentLevy = isSmallCompany || isNonResident ? 0 : +(0.04 * profits).toFixed(2);

    // Base CIT: 30% for others; 0% for small companies
    const baseCIT = isSmallCompany ? 0 : +(0.3 * profits).toFixed(2);

    // Aggregate covered tax (baseCIT + development levy + otherCoveredTaxes if provided)
    const otherTaxesVal = Number(otherCoveredTaxes || 0);
    const aggregateCoveredTax = +(baseCIT + developmentLevy + otherTaxesVal);

    // Profit definition for effective tax rate (per Act): "net profits before tax less 5% of depreciation and personnel cost"
    const dep = Number(depreciation || 0);
    const pers = Number(personnelCost || 0);
    const profitsForETR = Math.max(0, profits - 0.05 * (dep + pers));

    let effectiveTaxRate = 0;
    if (profitsForETR > 0) effectiveTaxRate = aggregateCoveredTax / profitsForETR;

    // If subjectToETRRule and effectiveTaxRate < 15% (0.15), compute top-up required
    let additionalTopUp = 0;
    if (subjectToETRRule && profitsForETR > 0 && effectiveTaxRate < 0.15) {
      const requiredTax = 0.15 * profitsForETR;
      additionalTopUp = Math.max(0, +(requiredTax - aggregateCoveredTax).toFixed(2));
    }

    const totalTaxPayable = +(aggregateCoveredTax + additionalTopUp).toFixed(2);

    setResult({
      mode: "company",
      assessableProfits: profits,
      baseCIT,
      developmentLevy,
      otherCoveredTaxes: otherTaxesVal,
      aggregateCoveredTax,
      depreciation: dep,
      personnelCost: pers,
      profitsForETR: +profitsForETR.toFixed(2),
      effectiveTaxRate: +(effectiveTaxRate * 100).toFixed(2), // percent
      additionalTopUp,
      totalTaxPayable,
      isSmallCompany,
      isNonResident,
      subjectToETRRule,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Tax Calculator</h1>

        {/* Mode selection */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMode("individual")}
            className={`px-4 py-2 rounded-lg ${mode === "individual" ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            Individual (PIT)
          </button>
          <button
            onClick={() => setMode("company")}
            className={`px-4 py-2 rounded-lg ${mode === "company" ? "bg-blue-600 text-white" : "bg-white border"}`}
          >
            Company (CIT)
          </button>
        </div>

        {/* Individual */}
        {mode === "individual" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <label className="block text-gray-700 mb-2">Annual Taxable Income (₦)</label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="e.g. 1500000"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={handleCalculateIndividual} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Calculate PIT
              </button>
              <button
                onClick={() => {
                  setAnnualIncome("");
                  setResult(null);
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Company */}
        {mode === "company" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
            <div>
              <label className="block text-gray-700 mb-2">Assessable Profits (₦)</label>
              <input
                type="number"
                value={assessableProfits}
                onChange={(e) => setAssessableProfits(e.target.value)}
                placeholder="e.g. 50000000"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={isSmallCompany} onChange={(e) => setIsSmallCompany(e.target.checked)} />
                <span className="ml-1">Small company (0% CIT)</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={isNonResident} onChange={(e) => setIsNonResident(e.target.checked)} />
                <span className="ml-1">Non-resident company (no development levy)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 mb-1">Depreciation (₦)</label>
                <input type="number" value={depreciation} onChange={(e) => setDepreciation(e.target.value)} className="w-full border rounded-lg px-2 py-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Personnel Cost (₦)</label>
                <input type="number" value={personnelCost} onChange={(e) => setPersonnelCost(e.target.value)} className="w-full border rounded-lg px-2 py-1" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Other covered taxes (₦)</label>
                <input type="number" value={otherCoveredTaxes} onChange={(e) => setOtherCoveredTaxes(e.target.value)} className="w-full border rounded-lg px-2 py-1" />
              </div>
            </div>

            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={subjectToETRRule} onChange={(e) => setSubjectToETRRule(e.target.checked)} />
              <span className="ml-1">Subject to Effective Tax Rate rule (ETR check & top-up to 15%)</span>
            </label>

            <div className="flex gap-3 pt-2">
              <button onClick={handleCalculateCompany} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Calculate CIT</button>
              <button
                onClick={() => {
                  setAssessableProfits("");
                  setDepreciation("");
                  setPersonnelCost("");
                  setOtherCoveredTaxes("");
                  setIsSmallCompany(false);
                  setIsNonResident(false);
                  setSubjectToETRRule(false);
                  setResult(null);
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {result && result.error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {result.error}
          </div>
        )}

        {result && result.mode === "individual" && (
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Individual PIT Result</h2>
            <p>Taxable Income: ₦{Number(result.taxableIncome).toLocaleString()}</p>
            <p className="text-2xl font-bold mt-3">Tax Payable: ₦{Number(result.taxPayable).toLocaleString()}</p>
          </div>
        )}

        {result && result.mode === "company" && (
          <div className="mt-6 bg-white p-6 rounded-2xl shadow-md space-y-2">
            <h2 className="text-lg font-semibold">Company Tax Result</h2>
            <p>Assessable Profits: ₦{Number(result.assessableProfits).toLocaleString()}</p>
            <p>Base CIT (30% or 0% if small): ₦{Number(result.baseCIT).toLocaleString()}</p>
            <p>Development Levy (4% if applicable): ₦{Number(result.developmentLevy).toLocaleString()}</p>
            <p>Other covered taxes: ₦{Number(result.otherCoveredTaxes).toLocaleString()}</p>
            <hr />
            <p>Aggregate covered tax: ₦{Number(result.aggregateCoveredTax).toLocaleString()}</p>
            <p>Profits used for ETR calc: ₦{Number(result.profitsForETR).toLocaleString()}</p>
            <p>Effective tax rate: {Number(result.effectiveTaxRate).toFixed(2)}%</p>
            {result.additionalTopUp > 0 ? (
              <p className="text-red-600 font-semibold">Additional top-up required to reach 15% ETR: ₦{Number(result.additionalTopUp).toLocaleString()}</p>
            ) : (
              <p className="text-green-600 font-semibold">No top-up required to meet 15% ETR</p>
            )}
            <p className="text-2xl font-bold mt-2">Total tax payable (incl. top-up): ₦{Number(result.totalTaxPayable).toLocaleString()}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TaxCalculator;
