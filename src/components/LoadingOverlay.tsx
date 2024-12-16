import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
}

export function LoadingOverlay({ message = 'Carregando dados...' }: Props) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}