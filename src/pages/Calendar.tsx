import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useEvents } from '../hooks/useEvents';
import { Calendar } from '../components/calendar/Calendar';
import { PageLoader } from '../components/shared/PageLoader';
import { RefreshButton } from '../components/shared/RefreshButton';
import { useQueryClient } from '@tanstack/react-query';
import { EventModal } from '../components/calendar/EventModal';

export function CalendarPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const queryClient = useQueryClient();
  const { events, isLoading, isFetching } = useEvents();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries({ 
        queryKey: ['events', sessionStorage.getItem('userId')] 
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading || isFetching) {
    return <PageLoader message="Carregando calendário..." />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calendário</h1>
        <div className="flex items-center gap-2">
          <RefreshButton 
            onClick={handleRefresh}
            isLoading={isRefreshing}
          />
          <button
            onClick={() => setShowEventModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Adicionar Evento
          </button>
        </div>
      </div>

      <Calendar />

      {showEventModal && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => {
            setShowEventModal(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
}