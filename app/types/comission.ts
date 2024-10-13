export type CommissionBreakdown = {
  tier: string;
  amount: number;
  commissionRate: number;
  commission: number;
};

export interface CommissionResult {
  total: number;
  breakdown: {
    tier: string;
    commission: number;
  }[];
}
