import { useState } from 'react';
import { useEvents } from '../hooks/useEvents';
import { Calendar } from '../components/calendar/Calendar';
import { PageLoader } from '../components/shared/PageLoader';

export function CalendarPage() {
  const { events, isLoading, isFetching } = useEvents();

  if (isLoading || isFetching) {
    return <PageLoader message="Carregando calendário..." />;
  }

  return <Calendar />;
}