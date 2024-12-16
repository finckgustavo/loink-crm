import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from 'recharts';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  data: AdMetrics[];
}

export function HeatmapChart({ data }: Props) {
  const platforms = ['Facebook', 'Kwai', 'TikTok'] as const;
  
  const chartData = data.flatMap(metric => ({
    date: metric.date,
    platform: metric.platform,
    z: metric.roas, // Usando ROAS como métrica de performance
  }));

  const maxRoas = Math.max(...data.map(d => d.roas));
  const minRoas = Math.min(...data.map(d => d.roas));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
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
            dataKey="platform"
            type="category"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ZAxis
            dataKey="z"
            type="number"
            range={[50, 500]}
            domain={[minRoas, maxRoas]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              const data = payload[0].payload;
              
              return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {format(parseISO(data.date), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Plataforma:</span> {data.platform}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">ROAS:</span> {data.z.toFixed(2)}x
                    </p>
                  </div>
                </div>
              );
            }}
          />
          <Scatter
            data={chartData}
            fill="#6366F1"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}