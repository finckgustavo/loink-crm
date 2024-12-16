import { useState } from 'react';
import { format } from 'date-fns';

interface Props {
  onRangeChange: (startDate: string, endDate: string) => void;
}

export function DateRangePicker({ onRangeChange }: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    onRangeChange(start, end);
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleChange(e.target.value, endDate)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleChange(startDate, e.target.value)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}