#Stock Screener Application#

This is a React-based stock screener application that allows users to filter and sort stocks based on various parameters.

**Setup**

To set up the application, follow these steps:

1. Clone the repository using the command `git clone https://github.com/ankur-kalita/Stock_Screening_Tool.git`
2. Install the required dependencies using the command `npm install`
3. Start the application using the command `npm run dev`

**Usage**

The application allows users to filter and sort stocks based on the following parameters:

* Market Capitalization
* P/E Ratio
* ROE
* Debt-to-Equity Ratio
* Dividend Yield
* Revenue Growth
* EPS Growth
* Current Ratio
* Gross Margin

Users can add filters by clicking the "Add Filter" button and selecting the parameter and operator. They can also remove filters by clicking the "Remove" button next to each filter.

The application also allows users to sort the stocks based on the selected parameter and direction (ascending or descending).

**Features**

* Filter stocks based on various parameters
* Sort stocks based on selected parameter and direction
* Add and remove filters dynamically
* Compare filtered stocks with sample stocks

**Code Structure**

The code is structured into the following components:

* `StockScreener.tsx`: The main component that renders the stock screener application
* `SortableStockTable.tsx`: The component that renders the sortable stock table
* `parameters.json`: The file that contains the parameter data
* `sampleStocks.json`: The file that contains the sample stock data

**Dependencies**

The application uses the following dependencies:

* React
* TypeScript
* Lucide React
* clsx

Note that this README file is based on my understanding of your code, and you may need to modify it to fit your specific use case.
