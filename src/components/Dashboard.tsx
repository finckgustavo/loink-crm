import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMetrics } from '../hooks/useMetrics';
import { useAuthContext } from '../contexts/AuthContext';
import { MetricsOverview } from './metrics/MetricsOverview';
import { MetricsCharts } from './metrics/MetricsCharts';
import { MetricsTable } from './metrics/MetricsTable';
import { DateFilter } from './metrics/DateFilter';
import { PlatformFilter } from './metrics/PlatformFilter';
import { ImportantTasks } from './todos/ImportantTasks';
import { LoadingOverlay } from './LoadingOverlay';
import { filterMetricsByPlatform } from '../utils/metrics';

export function Dashboard() {
  const { user } = useAuthContext();
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  
  const { metrics, isLoading, error } = useMetrics(dateRange);
  const filteredMetrics = filterMetricsByPlatform(metrics, selectedPlatform);
  const recentMetrics = filteredMetrics.slice(0, 7);

  // Obter primeiro nome do usuário
  const firstName = user?.full_name.split(' ')[0] || '';

  // Check if we're viewing today's metrics
  const today = new Date().toISOString().split('T')[0];
  const isViewingToday = dateRange.startDate === today && dateRange.endDate === today;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erro ao carregar métricas: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      
      <div className="p-8 w-full max-w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Olá {firstName} 👋🏼</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
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

        <MetricsOverview 
          metrics={filteredMetrics}
          showComparison={isViewingToday}
        />
        
        <MetricsCharts metrics={filteredMetrics} />

        <div className="bg-white rounded-lg shadow mt-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Métricas Recentes</h2>
              <Link
                to="/metrics"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Ver todas as métricas →
              </Link>
            </div>
          </div>
          <div className="max-w-full">
            <MetricsTable data={recentMetrics} isLoading={false} />
          </div>
        </div>

        <ImportantTasks />
      </div>
    </>
  );
}