import { MetricsCard } from './MetricsCard';
import { calculateDailyComparison } from '../../utils/metrics';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  metrics: AdMetrics[];
  showComparison?: boolean;
}

export function MetricsOverview({ metrics, showComparison = false }: Props) {
  // For today's view, we want to show single day values instead of totals
  const isComparingDaily = showComparison && metrics.length >= 2;
  
  // Get today's and yesterday's metrics
  const todayMetrics = isComparingDaily ? metrics[0] : null;
  const yesterdayMetrics = isComparingDaily ? metrics[1] : null;

  // Calculate values based on whether we're comparing daily or showing totals
  const spend = isComparingDaily ? todayMetrics?.spend || 0 : metrics.reduce((acc, curr) => acc + curr.spend, 0);
  const revenue = isComparingDaily ? todayMetrics?.revenue || 0 : metrics.reduce((acc, curr) => acc + curr.revenue, 0);
  const profit = isComparingDaily ? todayMetrics?.profit || 0 : metrics.reduce((acc, curr) => acc + (curr.revenue - curr.spend), 0);
  const roas = isComparingDaily ? todayMetrics?.roas || 0 : metrics.reduce((acc, curr) => acc + curr.roas, 0) / (metrics.length || 1);

  // Calculate comparisons if showing daily comparison
  const spendComparison = isComparingDaily && yesterdayMetrics
    ? calculateDailyComparison(todayMetrics!.spend, yesterdayMetrics.spend)
    : undefined;

  const revenueComparison = isComparingDaily && yesterdayMetrics
    ? calculateDailyComparison(todayMetrics!.revenue, yesterdayMetrics.revenue)
    : undefined;

  const profitComparison = isComparingDaily && yesterdayMetrics
    ? calculateDailyComparison(todayMetrics!.profit, yesterdayMetrics.profit)
    : undefined;

  const roasComparison = isComparingDaily && yesterdayMetrics
    ? calculateDailyComparison(todayMetrics!.roas, yesterdayMetrics.roas)
    : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricsCard
        title={isComparingDaily ? "Gasto Hoje" : "Total Gasto"}
        value={spend}
        icon="fa-solid fa-coins"
        color="blue"
        comparison={spendComparison}
      />
      <MetricsCard
        title={isComparingDaily ? "Receita Hoje" : "Receita Total"}
        value={revenue}
        icon="fa-solid fa-sack-dollar"
        color="green"
        comparison={revenueComparison}
      />
      <MetricsCard
        title={isComparingDaily ? "Lucro Hoje" : "Lucro"}
        value={profit}
        icon="fa-solid fa-wallet"
        color="purple"
        comparison={profitComparison}
      />
      <MetricsCard
        title={isComparingDaily ? "ROAS Hoje" : "ROAS Médio"}
        value={`${roas.toFixed(2)}x`}
        icon="fa-solid fa-chart-line"
        color="orange"
        comparison={roasComparison}
      />
    </div>
  );
}