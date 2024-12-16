import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

export function SpendByPlatformChart({ data }: Props) {
  const platforms = ['Facebook', 'Kwai', 'TikTok'] as const;
  
  const chartData = platforms.map(platform => ({
    platform,
    spend: data
      .filter(metric => metric.platform === platform)
      .reduce((acc, curr) => acc + curr.spend, 0),
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="platform"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={formatCurrency}
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
                  {payload.map((entry: any) => (
                    <div key={entry.dataKey} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">
                        {entry.name}: {formatCurrency(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
          <Bar
            dataKey="spend"
            name="Gasto"
            fill="#6366F1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}