import { useState } from 'react';
import { 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';
import { useEvents } from '../../hooks/useEvents';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { DayEventsModal } from './DayEventsModal';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDayEvents, setShowDayEvents] = useState(false);
  const { events, isLoading } = useEvents();

  // Obter primeiro dia do mês
  const monthStart = startOfMonth(currentDate);
  // Obter último dia do mês
  const monthEnd = endOfMonth(currentDate);
  // Obter primeiro dia da primeira semana (pode ser do mês anterior)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  // Obter último dia da última semana (pode ser do próximo mês)
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  // Gerar array com todos os dias que devem aparecer no calendário
  const daysInMonth = eachDayOfInterval({ 
    start: calendarStart,
    end: calendarEnd 
  });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  // Obter eventos do dia selecionado
  const selectedDateEvents = selectedDate
    ? events.filter(event => {
        const eventDate = parseISO(event.date);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando calendário...</p>
      </div>
    );
  }

  return (
    <div>
      <CalendarHeader
        currentDate={currentDate}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <CalendarGrid
            days={daysInMonth}
            currentDate={currentDate}
            events={events}
            onDateClick={(date) => {
              setSelectedDate(date);
              setShowDayEvents(true);
            }}
          />
        </div>
      </div>

      {showDayEvents && selectedDate && (
        <DayEventsModal
          date={selectedDate}
          events={selectedDateEvents}
          onClose={() => {
            setShowDayEvents(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
}