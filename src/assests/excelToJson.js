import xlsx from 'xlsx';
import fs from 'fs';

// Load the Excel file
const workbook = xlsx.readFile('src/assests/Sample dataset for Stock screener.xlsx'); // Replace with your actual file path

// Convert the first sheet to JSON
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Save to a JSON file
fs.writeFileSync('sampleStocks.json', JSON.stringify(jsonData, null, 2));

console.log('Excel data has been successfully converted to JSON!');
