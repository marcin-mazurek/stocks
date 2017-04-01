const getStockHistory = require('./get-stock-history');
const getExchangeRateHistory = require('./get-exchange-rate-history');

module.exports = function getStockHistoryInForeignCurrency(stocks, currency, startDate, endDate) {
  const stockHistoryPromises = [];

  for (let stock of stocks) {
    stockHistoryPromises.push(getStockHistory(stock, startDate, endDate));
  }

  const exchangeRateHistoryPromise = getExchangeRateHistory(currency, startDate, endDate);

  return Promise.all([exchangeRateHistoryPromise, ...stockHistoryPromises])
    .then(responses => {
      const [exchangeRateHistory, ...stockHistory] = responses;
      const stockHistoryInForeignCurrency = {};

      stockHistory.forEach((companyStockRateHistory, index) => {
        const dates = Object.keys(companyStockRateHistory);
        const companyStockInForeignCurrency = {};

        dates.forEach(date => {
          companyStockInForeignCurrency[date] =
            exchangeRateHistory[date] * companyStockRateHistory[date];
        });

        stockHistoryInForeignCurrency[stocks[index]] = companyStockInForeignCurrency;
      });

      return Promise.resolve(stockHistoryInForeignCurrency);
    });
};
