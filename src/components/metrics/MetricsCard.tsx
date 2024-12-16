import { formatCurrency } from '../../utils/format';

interface Props {
  title: string;
  value: string | number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  comparison?: {
    percentage: number;
    isPositive: boolean;
  };
}

const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export function MetricsCard({ title, value, icon, color, comparison }: Props) {
  // Format the value if it's a number (assuming it's currency)
  const displayValue = typeof value === 'number' ? formatCurrency(value) : value;
  
  // Determine text size class based on value length and type
  const getValueSize = (value: string) => {
    // Se for um valor negativo, diminui um nível o tamanho
    const isNegative = value.includes('-');
    const length = value.length;
    
    // Se for ROAS (termina com 'x'), usa o mesmo tamanho dos outros
    const isRoas = value.endsWith('x');
    if (isRoas) {
      return isNegative ? 'text-xl' : 'text-2xl';
    }

    // Para valores monetários
    if (length > 16) return 'text-lg';
    if (length > 12) return isNegative ? 'text-lg' : 'text-xl';
    if (length > 8) return isNegative ? 'text-xl' : 'text-2xl';
    return isNegative ? 'text-2xl' : 'text-2xl';
  };

  const valueSize = getValueSize(displayValue);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${colorMap[color]} flex items-center justify-center flex-shrink-0`}>
          <i className={`${icon} text-xl`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`font-semibold mb-1 truncate ${valueSize}`}>{displayValue}</p>
          {comparison && (
            <div className="flex items-center gap-1.5">
              <i className={`fa-solid ${comparison.isPositive ? 'fa-trending-up text-green-500' : 'fa-trending-down text-red-500'}`} />
              <span
                className={`text-sm font-medium ${
                  comparison.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {comparison.percentage.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">vs ontem</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}