import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  onRangeChange: (startDate: string, endDate: string) => void;
}

const presetRanges = [
  { label: 'Hoje', getDates: () => {
    const today = new Date();
    return { startDate: format(today, 'yyyy-MM-dd'), endDate: format(today, 'yyyy-MM-dd') };
  }},
  { label: 'Ontem', getDates: () => {
    const yesterday = addDays(new Date(), -1);
    return { startDate: format(yesterday, 'yyyy-MM-dd'), endDate: format(yesterday, 'yyyy-MM-dd') };
  }},
  { label: 'Últimos 7 dias', getDates: () => {
    const end = new Date();
    const start = addDays(end, -6);
    return { startDate: format(start, 'yyyy-MM-dd'), endDate: format(end, 'yyyy-MM-dd') };
  }},
  { label: 'Últimos 30 dias', getDates: () => {
    const end = new Date();
    const start = addDays(end, -29);
    return { startDate: format(start, 'yyyy-MM-dd'), endDate: format(end, 'yyyy-MM-dd') };
  }},
  { label: 'Tempo total', getDates: () => ({ startDate: '', endDate: '' })},
];

export function DateFilter({ onRangeChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Tempo total');
  const [customRange, setCustomRange] = useState({ startDate: '', endDate: '' });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = parseISO(dateStr);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const handlePresetSelect = (preset: typeof presetRanges[0]) => {
    const { startDate, endDate } = preset.getDates();
    setSelectedRange(preset.label);
    setCustomRange({ startDate, endDate });
    onRangeChange(startDate, endDate);
    setIsOpen(false);
  };

  const handleCustomRangeChange = () => {
    if (customRange.startDate && customRange.endDate) {
      setSelectedRange(`${formatDisplayDate(customRange.startDate)} - ${formatDisplayDate(customRange.endDate)}`);
      onRangeChange(customRange.startDate, customRange.endDate);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Calendar size={20} className="text-gray-500" />
        <span className="text-gray-700">{selectedRange}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="fixed transform -translate-x-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          style={{
            left: buttonRef.current ? buttonRef.current.getBoundingClientRect().right : 0,
            top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom : 0,
          }}
        >
          <div className="p-4">
            <div className="space-y-2 mb-4">
              {presetRanges.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetSelect(preset)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Período personalizado</p>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Data inicial</label>
                  <input
                    type="date"
                    value={customRange.startDate}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Data final</label>
                  <input
                    type="date"
                    value={customRange.endDate}
                    onChange={(e) => setCustomRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleCustomRangeChange}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}