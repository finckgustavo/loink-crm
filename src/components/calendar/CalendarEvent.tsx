import type { Event } from '../../types/event';

interface Props {
  event: Event;
}

export function CalendarEvent({ event }: Props) {
  return (
    <div
      className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700 truncate"
      title={`${event.title}${event.description ? `\n\n${event.description}` : ''}`}
    >
      {event.title}
    </div>
  );
}