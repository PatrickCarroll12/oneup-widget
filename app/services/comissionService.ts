import { CommissionBreakdown } from "../types/comission";

export const calculateCommission = (
  revenue: number
): { total: number; breakdown: CommissionBreakdown[] } => {
  const tiers = [
    { limit: 5000, rate: 0 }, // £0 → £5k: 0%
    { limit: 10000, rate: 0.1 }, // £5k → £10k: 10%
    { limit: 15000, rate: 0.15 }, // £10k → £15k: 15%
    { limit: 20000, rate: 0.2 }, // £15k → £20k: 20%
    { limit: Infinity, rate: 0.25 }, // £20k+: 25%
  ];

  let remainingRevenue = revenue;
  let total = 0;
  const breakdown: CommissionBreakdown[] = [];

  tiers.forEach((tier, index) => {
    const previousLimit = index === 0 ? 0 : tiers[index - 1].limit;
    const applicableRevenue = Math.min(
      remainingRevenue,
      tier.limit - previousLimit
    );

    if (applicableRevenue > 0) {
      const commission = applicableRevenue * tier.rate;

      breakdown.push({
        tier: `£${previousLimit.toLocaleString()} → £${
          tier.limit === Infinity ? "+" : tier.limit.toLocaleString()
        }`,
        amount: applicableRevenue,
        commissionRate: tier.rate * 100,
        commission: commission,
      });

      total += commission;
      remainingRevenue -= applicableRevenue;
    }
  });

  return {
    total,
    breakdown,
  };
};
