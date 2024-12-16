import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

export function SpendDistributionChart({ data }: Props) {
  const platforms = ['Facebook', 'Kwai', 'TikTok'] as const;
  
  const chartData = platforms.map(platform => ({
    name: platform,
    value: data
      .filter(metric => metric.platform === platform)
      .reduce((acc, curr) => acc + curr.spend, 0),
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const data = payload[0].payload;
              const percentage = ((data.value / total) * 100).toFixed(1);
              
              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">{data.name}</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Gasto:</span> {formatCurrency(data.value)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Participação:</span> {percentage}%
                    </p>
                  </div>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value, entry: any) => {
              const data = chartData.find(item => item.name === value);
              if (!data) return value;
              const percentage = ((data.value / total) * 100).toFixed(1);
              return (
                <span className="text-sm">
                  <span className="font-medium">{value}</span>
                  <br />
                  <span className="text-gray-500">{percentage}%</span>
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}