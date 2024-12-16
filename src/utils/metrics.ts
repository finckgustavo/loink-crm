import type { AdMetrics } from '../types/metrics';

export function filterMetricsByPlatform(metrics: AdMetrics[], platform: string) {
  if (platform === 'all') return metrics;
  return metrics.filter((metric) => metric.platform === platform);
}

export function calculateMetricsSummary(metrics: AdMetrics[]) {
  const totalSpend = metrics.reduce((acc, curr) => acc + curr.spend, 0);
  const totalRevenue = metrics.reduce((acc, curr) => acc + curr.revenue, 0);
  const averageRoas = metrics.reduce((acc, curr) => acc + curr.roas, 0) / (metrics.length || 1);
  const totalClicks = metrics.reduce((acc, curr) => acc + curr.clicks, 0);

  return {
    totalSpend,
    totalRevenue,
    averageRoas,
    totalClicks,
  };
}

export function calculateDailyComparison(currentValue: number, previousValue: number) {
  if (!previousValue) return undefined;
  
  const difference = currentValue - previousValue;
  const percentage = (difference / previousValue) * 100;
  
  return {
    percentage: Math.abs(percentage),
    isPositive: percentage > 0,
  };
}