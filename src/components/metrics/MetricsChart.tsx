import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
  type: 'revenue-spend' | 'roas';
}

const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (!active || !payload || !label) return null;

  try {
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
              {entry.name}:{' '}
              {type === 'revenue-spend'
                ? formatCurrency(entry.value)
                : `${entry.value.toFixed(2)}x`}
            </span>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return null;
  }
};

export function MetricsChart({ data, type }: Props) {
  const chartData = [...data].reverse(); // Reverse to show oldest to newest

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'revenue-spend' ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
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
            <Tooltip content={(props) => <CustomTooltip {...props} type="revenue-spend" />} />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-sm font-medium">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Receita"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorRevenue)"
              dot={{ stroke: '#10B981', strokeWidth: 2, r: 4, fill: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="spend"
              name="Gasto"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#colorSpend)"
              dot={{ stroke: '#EF4444', strokeWidth: 2, r: 4, fill: '#fff' }}
            />
          </AreaChart>
        ) : (
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
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={(props) => <CustomTooltip {...props} type="roas" />} />
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
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}