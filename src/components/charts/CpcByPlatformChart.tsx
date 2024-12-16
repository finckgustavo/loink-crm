import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

export function CpcByPlatformChart({ data }: Props) {
  const chartData = [...data]
    .reverse()
    .reduce((acc: any[], curr) => {
      const existingDate = acc.find(item => item.date === curr.date);
      if (existingDate) {
        existingDate[`${curr.platform}CPC`] = curr.cpc;
      } else {
        acc.push({
          date: curr.date,
          [`${curr.platform}CPC`]: curr.cpc,
        });
      }
      return acc;
    }, []);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(parseISO(value), 'dd/MM', { locale: ptBR })}
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
              if (!active || !payload || !label) return null;
              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {format(parseISO(label), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                  {payload.map((entry: any) => {
                    const platform = entry.dataKey.replace('CPC', '');
                    return (
                      <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium">
                          {platform}: {formatCurrency(entry.value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            formatter={(value) => {
              const platform = value.replace('CPC', '');
              return <span className="text-sm font-medium">{platform}</span>;
            }}
          />
          {Object.keys(COLORS).map((platform) => (
            <Line
              key={platform}
              type="monotone"
              dataKey={`${platform}CPC`}
              name={`${platform}CPC`}
              stroke={COLORS[platform as keyof typeof COLORS]}
              strokeWidth={2}
              dot={{ stroke: COLORS[platform as keyof typeof COLORS], strokeWidth: 2, r: 4, fill: '#fff' }}
              activeDot={{ r: 6, stroke: COLORS[platform as keyof typeof COLORS], strokeWidth: 2, fill: '#fff' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}