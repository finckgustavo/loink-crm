interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  prefix?: string;
  min?: number;
  step?: number;
}

export function NumberInput({
  label,
  value,
  onChange,
  error,
  prefix,
  min = 0,
  step = 0.01,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <span className="text-gray-500 select-none">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          step={step}
          className={`
            block w-full rounded-lg bg-gray-50 px-4 py-2.5 text-gray-900
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20
            ${prefix ? 'pl-10' : ''}
            ${error ? 'bg-red-50 focus:ring-red-500/20' : ''}
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}