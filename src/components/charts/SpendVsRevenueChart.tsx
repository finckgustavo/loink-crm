import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

export function SpendVsRevenueChart({ data }: Props) {
  const chartData = [...data].reverse();

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
                  {payload.map((entry: any) => (
                    <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
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
          <Line
            type="monotone"
            dataKey="spend"
            name="Gasto"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ stroke: '#EF4444', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2, fill: '#fff' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Receita"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ stroke: '#10B981', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}