// utils/generateStockData.js
export function generateStockData(count = 500) {
  const stockNames = [
    'Tech', 'Global', 'Advanced', 'Smart', 'Future', 'Modern', 'Digital', 'Innovative', 
    'Strategic', 'Dynamic', 'Premier', 'Elite', 'Prime', 'Core', 'Alpha', 'Beta', 
    'Delta', 'Omega', 'Meta', 'Cyber', 'Cloud', 'Net', 'Data', 'Quantum'
  ];
  
  const industries = [
    'Technologies', 'Solutions', 'Systems', 'Industries', 'Corporation', 'Enterprises',
    'Group', 'Holdings', 'Dynamics', 'Networks', 'Communications', 'Electronics'
  ];

  function generateStockName() {
    const name1 = stockNames[Math.floor(Math.random() * stockNames.length)];
    const name2 = industries[Math.floor(Math.random() * industries.length)];
    return `${name1} ${name2}`;
  }

  function randomInRange(min, max, decimals = 2) {
    return Number((Math.random() * (max - min) + min).toFixed(decimals));
  }

  const stocks = Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: generateStockName(),
    marketCap: randomInRange(100, 50000, 0),  // 100M to 50B
    peRatio: randomInRange(5, 50, 2),
    roe: randomInRange(0, 35, 2),
    debtEquity: randomInRange(0, 3, 2),
    dividendYield: randomInRange(0, 7, 2),
    revenueGrowth: randomInRange(-10, 50, 2),
    epsGrowth: randomInRange(-15, 45, 2),
    currentRatio: randomInRange(0.5, 4, 2),
    grossMargin: randomInRange(10, 80, 2)
  }));

  return stocks;
}

export const stockParameters = [
  { 
    id: 'marketCap',
    label: 'Market Capitalization',
    key: 'marketCap',
    format: (value) => `$${value.toLocaleString()}M`
  },
  { 
    id: 'peRatio',
    label: 'P/E Ratio',
    key: 'peRatio',
    format: (value) => value.toFixed(2)
  },
  { 
    id: 'roe',
    label: 'ROE',
    key: 'roe',
    format: (value) => `${value.toFixed(2)}%`
  },
  { 
    id: 'debtEquity',
    label: 'Debt-to-Equity',
    key: 'debtEquity',
    format: (value) => value.toFixed(2)
  },
  { 
    id: 'dividendYield',
    label: 'Dividend Yield',
    key: 'dividendYield',
    format: (value) => `${value.toFixed(2)}%`
  },
  { 
    id: 'revenueGrowth',
    label: 'Revenue Growth',
    key: 'revenueGrowth',
    format: (value) => `${value.toFixed(2)}%`
  },
  { 
    id: 'epsGrowth',
    label: 'EPS Growth',
    key: 'epsGrowth',
    format: (value) => `${value.toFixed(2)}%`
  },
  { 
    id: 'currentRatio',
    label: 'Current Ratio',
    key: 'currentRatio',
    format: (value) => value.toFixed(2)
  },
  { 
    id: 'grossMargin',
    label: 'Gross Margin',
    key: 'grossMargin',
    format: (value) => `${value.toFixed(2)}%`
  }
];