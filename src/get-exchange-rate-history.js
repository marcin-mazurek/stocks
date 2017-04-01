const getStockHistory = require('./get-stock-history');

const getExchangeRateHistory = (currency, ...args) => getStockHistory(`${currency}=X`, ...args);

module.exports = getExchangeRateHistory;
