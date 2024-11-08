"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import sampleStocks from "../assests/sampleStocks.json";
import SortableStockTable from "./SortableStockTable";
import { Lexend } from "next/font/google";

const parameters = [
  { id: "marketCap", label: "Market Capitalization (B)", key: "marketCap" },
  { id: "peRatio", label: "P/E Ratio", key: "peRatio" },
  { id: "roe", label: "ROE (%)", key: "roe" },
  { id: "debtEquity", label: "Debt-to-Equity Ratio", key: "debtEquity" },
  { id: "dividendYield", label: "Dividend Yield (%)", key: "dividendYield" },
  { id: "revenueGrowth", label: "Revenue Growth (%)", key: "revenueGrowth" },
  { id: "epsGrowth", label: "EPS Growth (%)", key: "epsGrowth" },
  { id: "currentRatio", label: "Current Ratio", key: "currentRatio" },
  { id: "grossMargin", label: "Gross Margin (%)", key: "grossMargin" },
];

const operators = [
  { value: ">", label: "Greater than" },
  { value: "<", label: "Less than" },
  { value: "=", label: "Equal to" },
  { value: ">=", label: " Greater than or Equal to" },
  { value: "<=", label: "Less than or Equal to" },
];

const StockScreener = () => {
  const [filters, setFilters] = useState([
    { id: 1, parameter: "", operator: ">", value: "" },
  ]);
  const [filteredStocks, setFilteredStocks] = useState<
    Array<{
      Ticker: string;
      "Market Capitalization (B)": number;
      "P/E Ratio": number;
      "ROE (%)": number;
      "Debt-to-Equity Ratio": number;
      "Dividend Yield (%)": number;
      "Revenue Growth (%)": number;
      "EPS Growth (%)": number;
      "Current Ratio": number;
      "Gross Margin (%)": number;
    }>
  >([]);
  const [showTable, setShowTable] = useState(false);

  const applyFilters = () => {
    const filteredData = sampleStocks.filter((stock) => {
      return filters.every((filter) => {
        if (!filter.parameter || !filter.value) return false;
        const comparisonParameter = parameters.filter((parameter) => {
          return parameter.key === filter.parameter;
        });
        const stockValue =
          stock[comparisonParameter[0].label as keyof typeof stock];
        const filterValue = parseFloat(filter.value) || 0;

        switch (filter.operator) {
          case ">":
            return Number(stockValue) > filterValue;
          case "<":
            return Number(stockValue) < filterValue;
          case "=":
            return Number(stockValue) === filterValue;
          case ">=":
            return Number(stockValue) >= filterValue;
          case "<=":
            return Number(stockValue) <= filterValue;
          default:
            return false;
        }
      });
    });
    console.log(
      filteredData.map((stock) => ({
        ...stock,
        name: stock.Ticker,
      }))
    );
    setFilteredStocks(filteredData);
    setShowTable(true); // Show table after filtering
  };

  const updateFilter = (id: number, field: string, value: string) => {
    setFilters(
      filters.map((filter) =>
        filter.id === id ? { ...filter, [field]: value } : filter
      )
    );
  };

  const addFilter = () => {
    setFilters([
      ...filters,
      { id: filters.length + 1, parameter: "", operator: ">", value: "" },
    ]);
  };

  const removeFilter = (id: number) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  return (
    <div className={"container mx-auto p-4"}>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-3xl">Search Query</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            {filters.map((filter, index) => (
              <div key={filter.id} className="flex items-center space-x-4">
                <select
                  className="border rounded p-2 w-1/3"
                  value={filter.parameter}
                  onChange={(e) =>
                    updateFilter(filter.id, "parameter", e.target.value)
                  }
                >
                  <option value="">Select Parameter</option>
                  {parameters.map((param) => (
                    <option key={param.id} value={param.key}>
                      {param.label}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded p-2 w-1/4"
                  value={filter.operator}
                  onChange={(e) =>
                    updateFilter(filter.id, "operator", e.target.value)
                  }
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="border rounded p-2 w-1/4"
                  value={filter.value}
                  onChange={(e) =>
                    updateFilter(filter.id, "value", e.target.value)
                  }
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

            <div className="actionBtns w-full flex gap-3">
            <Button variant={"outline"} className="" onClick={() => addFilter()}>
                + Add Filter
              </Button>
              <Button variant={"outline"} className="bg-green-500 text-white" onClick={() => applyFilters()}>
                Compare Sample Stocks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showTable && (
        <SortableStockTable
          stocks={filteredStocks.map((stock) => ({
            ...stock,
            name: stock.Ticker,
          }))}
          parameters={parameters}
          onSort={(key) => key}
          sortConfig={{ key: "", direction: "asc" }}
        />
      )}
    </div>
  );
};

export default StockScreener;
