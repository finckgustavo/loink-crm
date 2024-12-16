import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import type { AdMetrics } from '../../types/metrics';

const columnHelper = createColumnHelper<AdMetrics>();

interface Props {
  data: AdMetrics[];
  isLoading?: boolean;
  onDelete?: (id: string) => void;
}

export function MetricsTable({ data, isLoading, onDelete }: Props) {
  const columns = [
    columnHelper.accessor('date', {
      header: 'Data',
      cell: (info) => format(parseISO(info.getValue()), 'dd/MM/yyyy', { locale: ptBR }),
    }),
    columnHelper.accessor('platform', {
      header: 'Plataforma',
    }),
    columnHelper.accessor('spend', {
      header: 'Gasto',
      cell: (info) => formatCurrency(info.getValue()),
    }),
    columnHelper.accessor('revenue', {
      header: 'Receita',
      cell: (info) => formatCurrency(info.getValue()),
    }),
    columnHelper.accessor('profit', {
      header: 'Lucro',
      cell: (info) => formatCurrency(info.getValue()),
    }),
    columnHelper.accessor('roas', {
      header: 'ROAS',
      cell: (info) => `${info.getValue().toFixed(2)}x`,
    }),
    columnHelper.accessor('impressions', {
      header: 'Impressões',
      cell: (info) => info.getValue().toLocaleString('pt-BR'),
    }),
    columnHelper.accessor('clicks', {
      header: 'Cliques',
      cell: (info) => info.getValue().toLocaleString('pt-BR'),
    }),
    columnHelper.accessor('ctr', {
      header: 'CTR',
      cell: (info) => `${info.getValue().toFixed(2)}%`,
    }),
    columnHelper.accessor('cpc', {
      header: 'CPC',
      cell: (info) => formatCurrency(info.getValue()),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => onDelete && (
        <button
          onClick={() => onDelete(info.row.original.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          title="Excluir métrica"
        >
          <Trash2 size={18} />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Carregando métricas...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Nenhuma métrica encontrada para o período selecionado.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left text-gray-500 uppercase tracking-wider whitespace-nowrap
                        2xl:px-6 2xl:py-3 2xl:text-xs
                        xl:px-5 xl:py-2.5 xl:text-xs
                        lg:px-4 lg:py-2 lg:text-[11px]
                        md:px-3 md:py-2 md:text-[10px]
                        px-2 py-1.5 text-[10px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap text-gray-500
                        2xl:px-6 2xl:py-4 2xl:text-sm
                        xl:px-5 xl:py-3 xl:text-sm
                        lg:px-4 lg:py-2.5 lg:text-xs
                        md:px-3 md:py-2 md:text-xs
                        px-2 py-1.5 text-[11px]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}