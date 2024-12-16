import { useState } from 'react';
import { useMetrics } from '../hooks/useMetrics';
import { DateFilter } from '../components/metrics/DateFilter';
import { PlatformFilter } from '../components/metrics/PlatformFilter';
import { SpendVsRevenueChart } from '../components/charts/SpendVsRevenueChart';
import { RoasChart } from '../components/charts/RoasChart';
import { SpendByPlatformChart } from '../components/charts/SpendByPlatformChart';
import { RevenueByPlatformChart } from '../components/charts/RevenueByPlatformChart';
import { SpendDistributionChart } from '../components/charts/SpendDistributionChart';
import { CumulativeChart } from '../components/charts/CumulativeChart';
import { CtrByPlatformChart } from '../components/charts/CtrByPlatformChart';
import { CpcByPlatformChart } from '../components/charts/CpcByPlatformChart';
import { filterMetricsByPlatform } from '../utils/metrics';

export function ChartsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  
  const { metrics, isLoading, error } = useMetrics(dateRange);
  const filteredMetrics = filterMetricsByPlatform(metrics, selectedPlatform);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erro ao carregar métricas: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando gráficos...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Análise de Dados</h1>
        
        <div className="flex justify-between items-center">
          <PlatformFilter
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
          />
          <DateFilter
            onRangeChange={(startDate, endDate) =>
              setDateRange({ startDate, endDate })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Linhas – Gasto vs Receita */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Receita vs Gasto</h2>
          <p className="text-sm text-gray-500 mb-4">Comparação entre investimentos e retornos ao longo do tempo</p>
          <SpendVsRevenueChart data={filteredMetrics} />
        </div>

        {/* Gráfico de Linha – ROAS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">ROAS ao Longo do Tempo</h2>
          <p className="text-sm text-gray-500 mb-4">Evolução do retorno sobre o investimento em publicidade</p>
          <RoasChart data={filteredMetrics} />
        </div>

        {/* Gráfico de Barras – Gasto por Plataforma */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Gasto por Plataforma</h2>
          <p className="text-sm text-gray-500 mb-4">Distribuição do investimento entre plataformas</p>
          <SpendByPlatformChart data={metrics} />
        </div>

        {/* Gráfico de Barras – Receita por Plataforma */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Receita por Plataforma</h2>
          <p className="text-sm text-gray-500 mb-4">Retorno financeiro gerado por cada plataforma</p>
          <RevenueByPlatformChart data={metrics} />
        </div>

        {/* Gráfico de Pizza – Participação de Gasto */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Distribuição de Gastos</h2>
          <p className="text-sm text-gray-500 mb-4">Proporção de investimento entre plataformas</p>
          <SpendDistributionChart data={metrics} />
        </div>

        {/* Gráfico de Área – Gasto vs Receita Acumulados */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Receita vs Gasto Acumulados</h2>
          <p className="text-sm text-gray-500 mb-4">Evolução acumulada dos gastos e receitas</p>
          <CumulativeChart data={filteredMetrics} />
        </div>

        {/* Gráfico de Linhas – CTR por Plataforma */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">CTR por Plataforma</h2>
          <p className="text-sm text-gray-500 mb-4">Taxa de cliques ao longo do tempo por plataforma</p>
          <CtrByPlatformChart data={metrics} />
        </div>

        {/* Gráfico de Linhas – CPC por Plataforma */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">CPC por Plataforma</h2>
          <p className="text-sm text-gray-500 mb-4">Custo por clique ao longo do tempo por plataforma</p>
          <CpcByPlatformChart data={metrics} />
        </div>
      </div>
    </div>
  );
}