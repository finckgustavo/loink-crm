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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
          <i className={`${icon} text-xl`} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-semibold mb-1">{displayValue}</p>
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