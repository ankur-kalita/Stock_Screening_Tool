"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

// Sample dataset - In a real app, this would be imported from a JSON file
const sampleStocks = [
  {
    name: "Stock A",
    marketCap: 15000,
    peRatio: 18.5,
    roe: 17.8,
    debtEquity: 0.8,
    dividendYield: 2.5,
    revenueGrowth: 12.3,
    epsGrowth: 11.5,
    currentRatio: 2.2,
    grossMargin: 45.6,
  },
  // Add more sample stocks here
];

const parameters = [
  { id: 'marketCap', label: 'Market Capitalization', key: 'marketCap' },
  { id: 'peRatio', label: 'P/E Ratio', key: 'peRatio' },
  { id: 'roe', label: 'ROE', key: 'roe' },
  { id: 'debtEquity', label: 'Debt-to-Equity Ratio', key: 'debtEquity' },
  { id: 'dividendYield', label: 'Dividend Yield', key: 'dividendYield' },
  { id: 'revenueGrowth', label: 'Revenue Growth', key: 'revenueGrowth' },
  { id: 'epsGrowth', label: 'EPS Growth', key: 'epsGrowth' },
  { id: 'currentRatio', label: 'Current Ratio', key: 'currentRatio' },
  { id: 'grossMargin', label: 'Gross Margin', key: 'grossMargin' },
];

const operators = [
  { value: '>', label: 'Greater than' },
  { value: '<', label: 'Less than' },
  { value: '=', label: 'Equal to' },
];

const StockScreener = () => {
  const [filters, setFilters] = useState([
    { id: 1, parameter: '', operator: '>', value: '' }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const addFilter = () => {
    const newFilter = {
      id: filters.length + 1,
      parameter: '',
      operator: '>',
      value: ''
    };
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: number) => {
    if (filters.length > 1) {
      setFilters(filters.filter(filter => filter.id !== id));
    }
  };

  const updateFilter = (id: number, field: string, value: string | number) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, [field]: value } : filter
    ));
  };

  const filteredStocks = useMemo(() => {
    return sampleStocks.filter(stock => {
      return filters.every(filter => {
        if (!filter.parameter || !filter.value) return true;
        
        const stockValue = stock[filter.parameter as keyof typeof stock];
        const filterValue = parseFloat(filter.value) || 0; // Default to 0 if NaN
        
        switch (filter.operator) {
          case '>': return Number(stockValue) > filterValue;
          case '<': return Number(stockValue) < filterValue;
          case '=': return Number(stockValue) === filterValue;
          default: return true;
        }
      });
    });
  }, [filters]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredStocks.length / itemsPerPage));
  const currentStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Screener</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex items-center space-x-4">
                <select
                  className="border rounded p-2 w-1/3"
                  value={filter.parameter}
                  onChange={(e) => updateFilter(filter.id, 'parameter', e.target.value)}
                >
                  <option value="">Select Parameter</option>
                  {parameters.map(param => (
                    <option key={param.id} value={param.key}>{param.label}</option>
                  ))}
                </select>
                
                <select
                  className="border rounded p-2 w-1/4"
                  value={filter.operator}
                  onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                >
                  {operators.map(op => (
                    <option key={op.value} value={op.value}>{op.label}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  className="border rounded p-2 w-1/4"
                  value={filter.value}
                  onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                  placeholder="Value"
                />
                
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={addFilter}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="p-2 text-left">Name</th>
                  {parameters.map(param => (
                    <th key={param.id} className="p-2 text-left">{param.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-2">{stock.name}</td>
                    {parameters.map(param => (
                      <td key={param.id} className="p-2">
                        {stock[param.key as keyof typeof stock] ? (stock[param.key as keyof typeof stock] as number).toFixed(2) : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="py-2 px-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockScreener;
