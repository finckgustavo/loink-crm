import { Loader2 } from 'lucide-react';

interface Props {
  message?: string;
}

export function PageLoader({ message = 'Carregando dados...' }: Props) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
}