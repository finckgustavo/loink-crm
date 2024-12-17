import { RotateCw } from 'lucide-react';

interface Props {
  onClick: () => void;
  isLoading?: boolean;
}

export function RefreshButton({ onClick, isLoading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="p-2 bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
      title="Recarregar dados"
    >
      <RotateCw 
        size={20} 
        className={`${isLoading ? 'animate-spin' : ''}`} 
      />
    </button>
  );
}