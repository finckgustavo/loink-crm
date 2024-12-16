import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X, Trash2 } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import type { Event } from '../../types/event';

interface Props {
  date: Date;
  events: Event[];
  onClose: () => void;
}

export function DayEventsModal({ date, events, onClose }: Props) {
  const { deleteEvent, isDeleting } = useEvents();

  const handleDelete = async (eventId: string) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteEvent(eventId);
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Eventos do dia {format(date, "dd 'de' MMMM", { locale: ptBR })}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {events.length === 0 ? (
            <p className="text-gray-500 text-center">
              Nenhum evento cadastrado para este dia.
            </p>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative group"
                >
                  <button
                    onClick={() => handleDelete(event.id)}
                    disabled={isDeleting}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Excluir evento"
                  >
                    <Trash2 size={18} />
                  </button>

                  <h3 className="text-lg font-medium text-gray-900 mb-2 pr-10">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm whitespace-pre-line">
                      {event.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}