const getMultiYearStockHistoryInForeignCurrency = require('./get-multi-year-stock-history-in-foreign-currency');
const convertToGoogleChartsFormat = require('./convert-to-google-charts-format');
const compose = require('lodash/fp/compose');

const stocks = [
  'GOOGL', 'AAPL', 'FB', 'AMZN', 'NFLX'
];

const convertAndOutput = compose(console.log, JSON.stringify, convertToGoogleChartsFormat);

getMultiYearStockHistoryInForeignCurrency(stocks, 'PLN', 2010, 2017)
  .then(convertAndOutput)
  .catch(console.error);
