import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';

interface Props {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
}

export function CalendarHeader({ currentDate, onPreviousMonth, onNextMonth, onAddEvent }: Props) {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calendário</h1>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Adicionar Evento
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-chevron-left text-gray-600" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-chevron-right text-gray-600" />
          </button>
        </div>
      </div>
    </>
  );
}