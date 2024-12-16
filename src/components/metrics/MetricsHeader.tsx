import { Plus } from 'lucide-react';

interface Props {
  onAddMetrics: () => void;
}

export function MetricsHeader({ onAddMetrics }: Props) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard de Anúncios</h1>
      <button
        onClick={onAddMetrics}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        Adicionar Métricas
      </button>
    </div>
  );
}