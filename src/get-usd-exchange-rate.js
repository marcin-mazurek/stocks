const getUsdExchangeRate = (currency, ...args) => getStockData(`${currency}=X`, ...args);

module.exports = getUsdExchangeRate;
