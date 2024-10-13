"use client";

import { Chart, registerables } from "chart.js";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { calculateCommission } from "./services/comissionService";
import { CommissionResult } from "./types/comission";
import * as Styles from "./styles/comissionStyles";

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
    <Styles.Container>
      <Styles.Widget>
        <Styles.Title>Commission Calculator</Styles.Title>
        <Styles.Input
          type="number"
          placeholder="Enter revenue"
          value={revenue === null ? "" : revenue}
          onChange={(e) => setRevenue(parseFloat(e.target.value))}
        />
        <Styles.Button onClick={handleCalculate}>
          Calculate Commission
        </Styles.Button>

        {commissionResult && (
          <Styles.CommissionResultContainer>
            <Styles.TotalCommission>
              Total Commission: £{commissionResult.total.toFixed(2)}
            </Styles.TotalCommission>
            <Styles.ChartContainer>
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
            </Styles.ChartContainer>
            <Styles.BreakdownContainer>
              {commissionResult.breakdown.map((item, index) => (
                <Styles.BreakdownItem key={index}>
                  <span>{item.tier}</span>
                  <span>£{item.commission.toFixed(2)}</span>
                </Styles.BreakdownItem>
              ))}
            </Styles.BreakdownContainer>
          </Styles.CommissionResultContainer>
        )}
      </Styles.Widget>
    </Styles.Container>
  );
}
