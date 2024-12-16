import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { MetricsFormData } from '../types/metrics';
import { X } from 'lucide-react';

const schema = z.object({
  date: z.string(),
  platform: z.enum(['Kwai', 'Facebook', 'TikTok']),
  spend: z.number().min(0),
  revenue: z.number().min(0),
  impressions: z.number().min(0),
  clicks: z.number().min(0),
});

interface Props {
  onSubmit: (data: MetricsFormData) => void;
  onClose: () => void;
}

export function MetricsForm({ onSubmit, onClose }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<MetricsFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Metrics</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              {...register('date')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Platform</label>
            <select
              {...register('platform')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="Kwai">Kwai</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
            </select>
            {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Spend</label>
            <input
              type="number"
              step="0.01"
              {...register('spend', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.spend && <p className="text-red-500 text-sm mt-1">{errors.spend.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revenue</label>
            <input
              type="number"
              step="0.01"
              {...register('revenue', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.revenue && <p className="text-red-500 text-sm mt-1">{errors.revenue.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Impressions</label>
            <input
              type="number"
              {...register('impressions', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.impressions && <p className="text-red-500 text-sm mt-1">{errors.impressions.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Clicks</label>
            <input
              type="number"
              {...register('clicks', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.clicks && <p className="text-red-500 text-sm mt-1">{errors.clicks.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Metrics
          </button>
        </form>
      </div>
    </div>
  );
}