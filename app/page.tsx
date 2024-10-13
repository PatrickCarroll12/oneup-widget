"use client";

import { useState } from "react";

export default function Home() {
  const [revenue, setRevenue] = useState<number | null>(null);

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
    </div>
  );
}
