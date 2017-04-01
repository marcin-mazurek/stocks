const merge = require('lodash/merge');

const getStockHistoryInForeignCurrency = require('./get-stock-history-in-foreign-currency');

module.exports = function getMultiYearStockHistoryInForeignCurrency(stocks, currency, yearStart, yearEnd) {
  if (yearEnd < yearStart) {
    throw new Error('End year must be greater than start year');
  }

  const promises = [];

  // Download data in reverse direction (the most recent data goes first)
  for (let currentYear = yearEnd; currentYear >= yearStart; currentYear--) {
    promises.push(
      getStockHistoryInForeignCurrency(stocks, currency, `${currentYear}-01-01`, `${currentYear+1}-01-01`)
    );
  }

  return Promise.all(promises)
    .then(responses => {
      const [firstResponse, ...otherResponses] = responses;
      const mergedData = merge(firstResponse, ...otherResponses);
      return Promise.resolve(mergedData);
    });
}
