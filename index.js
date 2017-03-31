const get = require('axios').get;

function getStockData(symbols, startDate, endDate) {
  const joinedSymbols = symbols.map(symbol => `"${symbol}"`).join(',');

  return new Promise((resolve, reject) => {
    return get('http://query.yahooapis.com/v1/public/yql', {
      params: {
        q: `select Symbol, Date, Close from yahoo.finance.historicaldata where symbol in (${joinedSymbols}) and startDate = "${startDate}" and endDate = "${endDate}"`,
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
    }})
    .then(response => resolve(response.data.query.results.quote))
    .catch(reject);
  });
}

getStockData(['AAPL', 'GOOG', 'AMZN'], '2017-01-01', '2017-03-31')
  .then(response => console.log(response));
