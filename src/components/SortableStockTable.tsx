import React from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stock {
  id: string;
  name: string;
  [key: string]: unknown; // For dynamic parameter values
}

interface Parameter {
  id: string;
  key: string;
  label: string;
  format: (value: unknown) => string | number;
}

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

interface SortableStockTableProps {
  stocks: Stock[];
  parameters: Parameter[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

const SortableStockTable: React.FC<SortableStockTableProps> = ({
  stocks,
  parameters,
  sortConfig,
  onSort,
  currentPage, // Keep these props even if unused for now
  itemsPerPage // They might be used in future implementations
}) => {
  const getHeaderSortIcon = (paramId: string) => {
    if (sortConfig.key === paramId) {
      return sortConfig.direction === 'asc' ? 
        <ChevronUp className="ml-2 h-4 w-4" /> : 
        <ChevronDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50/50">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              {parameters.map(param => (
                <th key={param.id} className="py-3 px-4">
                  <Button
                    variant="ghost"
                    className="h-8 flex items-center font-medium hover:bg-gray-100"
                    onClick={() => onSort(param.key)}
                  >
                    {param.label}
                    {getHeaderSortIcon(param.key)}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr
                key={stock.id}
                className={`
                  border-b transition-colors hover:bg-gray-50/50
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                `}
              >
                <td className="py-3 px-4 font-medium">{stock.name}</td>
                {parameters.map(param => (
                  <td key={param.id} className="py-3 px-4 text-right">
                    {param.format(stock[param.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableStockTable;