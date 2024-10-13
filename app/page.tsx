"use client";

import { useState } from "react";
import { calculateCommission } from "./services/comissionService";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { CommissionResult } from "./types/comission";

Chart.register(...registerables);

export default function Home() {
  const [revenue, setRevenue] = useState<number | null>(null);
  const [commissionResult, setCommissionResult] =
    useState<CommissionResult | null>(null);

  const handleCalculate = () => {
    if (revenue !== null && revenue >= 0) {
      const result = calculateCommission(revenue);
      setCommissionResult(result);
    } else {
      setCommissionResult(null);
    }
  };

  const chartData = {
    labels: commissionResult?.breakdown.map((item) => item.tier) || [],
    datasets: [
      {
        data: commissionResult?.breakdown.map((item) => item.commission) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          padding: "20px",
          maxWidth: "600px",
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Commission Calculator</h1>
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
            borderRadius: "4px",
            border: "1px solid #ddd",
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
            width: "100%",
          }}
        >
          Calculate Commission
        </button>

        {commissionResult && (
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ textAlign: "center" }}>
              Total Commission: £{commissionResult.total.toFixed(2)}
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          const commission = tooltipItem.raw as number;
                          const percentage = (
                            (commission / commissionResult.total) *
                            100
                          ).toFixed(2);
                          return `£${commission} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
                style={{ maxHeight: "300px", maxWidth: "300px" }}
              />
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {commissionResult.breakdown.map((item, index) => (
                <li key={index}>
                  {item.tier}: £{item.commission.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
