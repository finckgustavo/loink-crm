import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

const COLORS = {
  Facebook: '#6366F1',
  Kwai: '#10B981',
  TikTok: '#F59E0B',
} as const;

export function CpcVsCtrChart({ data }: Props) {
  const platforms = ['Facebook', 'Kwai', 'TikTok'] as const;
  
  const chartData = platforms.map(platform => ({
    name: platform,
    data: data
      .filter(metric => metric.platform === platform)
      .map(metric => ({
        cpc: metric.cpc,
        ctr: metric.ctr,
      })),
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            dataKey="ctr"
            name="CTR"
            unit="%"
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="cpc"
            name="CPC"
            tickFormatter={formatCurrency}
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const data = payload[0].payload;
              
              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">{payload[0].name}</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">CTR:</span> {data.ctr.toFixed(2)}%
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">CPC:</span> {formatCurrency(data.cpc)}
                    </p>
                  </div>
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
          {chartData.map((platform) => (
            <Scatter
              key={platform.name}
              name={platform.name}
              data={platform.data}
              fill={COLORS[platform.name as keyof typeof COLORS]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}