"use client";

import { useState } from "react";
import { calculateCommission } from "./services/comissionService";

export default function Home() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [commissionResult, setCommissionResult] = useState<{
    total: number;
    breakdown: { tier: string; commission: number }[];
  } | null>(null);

  const handleCalculate = () => {
    if (revenue !== null && revenue >= 0) {
      const result = calculateCommission(revenue);
      setCommissionResult(result);
    } else {
      setCommissionResult(null);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Commission Calculator</h1>
      <input
        type="number"
        placeholder="Enter revenue"
        value={revenue === null ? "" : revenue}
        onChange={(e) => setRevenue(parseFloat(e.target.value))}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Calculate Commission
      </button>

      {commissionResult && (
        <div style={{ marginTop: "20px" }}>
          <h2>Total Commission: £{commissionResult.total}</h2>
          <ul>
            {commissionResult.breakdown.map((item, index) => (
              <li key={index}>
                {item.tier}: £{item.commission}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
