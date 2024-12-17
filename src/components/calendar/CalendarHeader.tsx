import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPreviousMonth, onNextMonth }: Props) {
  return (
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
  );
}