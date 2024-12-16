import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMetrics } from '../hooks/useMetrics';
import { MetricsTable } from '../components/metrics/MetricsTable';
import { DateFilter } from '../components/metrics/DateFilter';
import { PlatformFilter } from '../components/metrics/PlatformFilter';
import { MetricsForm } from '../components/metrics/MetricsForm';
import { ConfirmationModal } from '../components/shared/ConfirmationModal';
import { filterMetricsByPlatform } from '../utils/metrics';

export function MetricsList() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [metricToDelete, setMetricToDelete] = useState<string | null>(null);
  
  const { metrics, isLoading, error, addMetrics, deleteMetrics, isDeleting } = useMetrics(dateRange);
  const filteredMetrics = filterMetricsByPlatform(metrics, selectedPlatform);

  const handleDelete = (id: string) => {
    setMetricToDelete(id);
  };

  const confirmDelete = async () => {
    if (metricToDelete) {
      await deleteMetrics(metricToDelete);
      setMetricToDelete(null);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Erro ao carregar métricas: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Lista de Dados</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Adicionar Métricas
          </button>
        </div>
        
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

      <div className="bg-white rounded-lg shadow-sm">
        <MetricsTable 
          data={filteredMetrics} 
          isLoading={isLoading} 
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <MetricsForm
          onSubmit={(data) => {
            addMetrics(data);
            setShowForm(false);
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      {metricToDelete && (
        <ConfirmationModal
          title="Excluir Métrica"
          message="Tem certeza que deseja excluir esta métrica? Esta ação não pode ser desfeita."
          confirmLabel="Excluir"
          isLoading={isDeleting}
          onConfirm={confirmDelete}
          onCancel={() => setMetricToDelete(null)}
        />
      )}
    </div>
  );
}