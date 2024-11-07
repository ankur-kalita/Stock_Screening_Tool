"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import sampleStocks from '../assests/sampleStocks.json';
import SortableStockTable from './SortableStockTable'; // Import the SortableStockTable component

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
  const [filters, setFilters] = useState([{ id: 1, parameter: '', operator: '>', value: '' }]);
  const [filteredStocks, setFilteredStocks] = useState(sampleStocks);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const applyFilters = () => {
    const filteredData = sampleStocks.filter(stock => {
      return filters.every(filter => {
        if (!filter.parameter || !filter.value) return true;
        
        const stockValue = stock[filter.parameter as keyof typeof stock];
        const filterValue = parseFloat(filter.value) || 0;

        switch (filter.operator) {
          case '>': return Number(stockValue) > filterValue;
          case '<': return Number(stockValue) < filterValue;
          case '=': return Number(stockValue) === filterValue;
          default: return true;
        }
      });
    });
    setFilteredStocks(filteredData);
  };

  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    const sortedData = [...filteredStocks].sort((a, b) => {
      const aValue = a[key as keyof typeof a];
      const bValue = b[key as keyof typeof b];
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredStocks(sortedData);
  };

  const compareWithSampleStocks = () => {
    const comparedData = sampleStocks.filter(stock => {
      return filters.every(filter => {
        if (!filter.parameter || !filter.value) return true;
        
        const stockValue = stock[filter.parameter as keyof typeof stock];
        const filterValue = parseFloat(filter.value) || 0;

        switch (filter.operator) {
          case '>': return Number(stockValue) > filterValue;
          case '<': return Number(stockValue) < filterValue;
          case '=': return Number(stockValue) === filterValue;
          default: return true;
        }
      });
    });
    setFilteredStocks(comparedData);
  };

  const updateFilter = (id: number, field: string, value: string) => {
    setFilters(filters.map(filter => filter.id === id ? { ...filter, [field]: value } : filter));
  };

  const addFilter = () => {
    setFilters([...filters, { id: filters.length + 1, parameter: '', operator: '>', value: '' }]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter(filter => filter.id !== id));
  };

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
            <Button
              variant="outline"
              onClick={applyFilters}
              className="mt-4"
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={compareWithSampleStocks}
              className="mt-4"
            >
              Compare with Sample Stocks
            </Button>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Pass filtered stocks to SortableStockTable */}
      <SortableStockTable
        stocks={filteredStocks.map(stock => ({ ...stock, name: stock.Ticker }))}
        parameters={parameters}
        sortConfig={{ ...sortConfig, direction: sortConfig.direction === 'asc' || sortConfig.direction === 'desc' ? sortConfig.direction : 'asc' }}
        onSort={handleSort}
      />
    </div>
  );
};

export default StockScreener;