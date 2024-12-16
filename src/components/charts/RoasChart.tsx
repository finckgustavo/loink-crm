import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

export function RoasChart({ data }: Props) {
  const chartData = [...data].reverse();

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            tickFormatter={(value) => `${value.toFixed(2)}x`}
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
                  {payload.map((entry: any) => (
                    <div key={entry.dataKey} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium">
                        {entry.name}: {entry.value.toFixed(2)}x
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
          <Line
            type="monotone"
            dataKey="roas"
            name="ROAS"
            stroke="#6366F1"
            strokeWidth={2}
            dot={{ stroke: '#6366F1', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#6366F1', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}