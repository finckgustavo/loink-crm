import { useState } from 'react';
import { X } from 'lucide-react';
import { PlatformSelector } from './PlatformSelector';
import { NumberInput } from './NumberInput';
import type { MetricsFormData, Platform } from '../../types/metrics';

interface Props {
  onSubmit: (data: MetricsFormData) => void;
  onClose: () => void;
}

export function MetricsForm({ onSubmit, onClose }: Props) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [platform, setPlatform] = useState<Platform>('Facebook');
  const [spend, setSpend] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof MetricsFormData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof MetricsFormData, string>> = {};

    if (!date) newErrors.date = 'Data é obrigatória';
    if (spend < 0) newErrors.spend = 'Gasto não pode ser negativo';
    if (revenue < 0) newErrors.revenue = 'Receita não pode ser negativa';
    if (impressions < 0) newErrors.impressions = 'Impressões não podem ser negativas';
    if (clicks < 0) newErrors.clicks = 'Cliques não podem ser negativos';
    if (clicks > impressions) newErrors.clicks = 'Cliques não podem ser maiores que impressões';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        date,
        platform,
        spend,
        revenue,
        impressions,
        clicks,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Adicionar Métricas</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="block w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Plataforma
              </label>
              <PlatformSelector value={platform} onChange={setPlatform} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <NumberInput
                label="Gasto"
                value={spend}
                onChange={setSpend}
                error={errors.spend}
                prefix="R$"
              />
              <NumberInput
                label="Receita"
                value={revenue}
                onChange={setRevenue}
                error={errors.revenue}
                prefix="R$"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <NumberInput
                label="Impressões"
                value={impressions}
                onChange={setImpressions}
                error={errors.impressions}
                step={1}
              />
              <NumberInput
                label="Cliques"
                value={clicks}
                onChange={setClicks}
                error={errors.clicks}
                step={1}
              />
            </div>
          </div>

          <div className="flex gap-3 p-6 bg-gray-50 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}