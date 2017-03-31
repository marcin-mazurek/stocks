const get = require('axios').get;

function getStockData(symbols) {
  const joinedSymbols = symbols.map(symbol => '"' + symbol + '"').join(',');

  return new Promise((resolve, reject) => {
    return get('http://query.yahooapis.com/v1/public/yql', {
      params: {
        q: 'select Symbol, Date, Close from yahoo.finance.historicaldata where symbol in (' + joinedSymbols + ') and startDate = "2017-01-01" and endDate = "2017-03-31"',
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
    }})
    .then(response => resolve(response.data.query.results.quote))
    .catch(reject);
  });
}

getStockData(['AAPL', 'GOOG', 'AMZN'])
  .then(response => console.log(response));