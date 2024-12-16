import { MetricsChart } from './MetricsChart';
import type { AdMetrics } from '../../types/metrics';

interface Props {
  metrics: AdMetrics[];
}

export function MetricsCharts({ metrics }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Receita vs. Gastos</h2>
          <p className="text-sm text-gray-500">Comparação entre receita e gastos ao longo do tempo</p>
        </div>
        <MetricsChart data={metrics} type="revenue-spend" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">ROAS</h2>
          <p className="text-sm text-gray-500">Retorno sobre o investimento em publicidade</p>
        </div>
        <MetricsChart data={metrics} type="roas" />
      </div>
    </div>
  );
}