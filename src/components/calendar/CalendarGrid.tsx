import { format, isSameMonth, isToday, parseISO } from 'date-fns';
import { CalendarEvent } from './CalendarEvent';
import type { Event } from '../../types/event';

interface Props {
  days: Date[];
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export function CalendarGrid({ days, currentDate, events, onDateClick }: Props) {
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg">
      {weekDays.map(day => (
        <div
          key={day}
          className="bg-gray-50 text-center py-2 text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}

      {days.map(date => {
        const dayEvents = getEventsForDate(date);
        const isCurrentMonth = isSameMonth(date, currentDate);
        const isCurrentDay = isToday(date);

        return (
          <div
            key={date.toString()}
            onClick={() => dayEvents.length > 0 && onDateClick(date)}
            className={`
              min-h-[80px] p-2 bg-white cursor-pointer
              ${!isCurrentMonth ? 'bg-gray-50' : ''}
              ${isCurrentDay ? 'bg-blue-50' : ''}
              ${dayEvents.length > 0 ? 'hover:bg-gray-50' : ''}
            `}
          >
            <span
              className={`
                text-sm font-medium
                ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                ${isCurrentDay ? 'text-blue-600' : ''}
              `}
            >
              {format(date, 'd')}
            </span>

            <div className="mt-1 space-y-1">
              {dayEvents.map(event => (
                <CalendarEvent key={event.id} event={event} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}