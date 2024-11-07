import React from "react";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stock {
  name: string;
  [key: string]: string | number | boolean;
}

interface Parameter {
  id: string;
  key: string;
  label: string;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

type SortableStockTableProps = {
  stocks: Stock[];
  parameters: Parameter[];
  sortConfig: SortConfig;
  onSort: (key: string) => void;
};

const SortableStockTable: React.FC<SortableStockTableProps> = ({
  stocks,
  parameters,
  sortConfig,
  onSort,
}) => {
  const getHeaderSortIcon = (paramId: string) => {
    if (sortConfig.key === paramId) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4" />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="rounded-md border mt-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50/50">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              {parameters.map((param) => (
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
              <tr key={index} className="border-b last:border-none">
                <td className="py-3 px-4">{stock.name}</td>
                {parameters.map((param) => (
                  <td key={param.id} className="py-3 px-4">
                    {stock[param.label] || "N/A"}
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
