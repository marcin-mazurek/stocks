const get = require('axios').get;

function transformResponse(response) {
  try {
    const quotes = response.data.query.results.quote;
    const result = {};
    quotes.forEach(quote => result[quote.Date] = quote.Close);
    return result;
  } catch (e) {
    return {};
  }
}

module.exports = function getStockData(symbol, startDate, endDate) {
  return get('http://query.yahooapis.com/v1/public/yql', {
    params: {
      q: `select Date, Close from yahoo.finance.historicaldata where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`,
      format: 'json',
      env: 'store://datatables.org/alltableswithkeys'
  }})
  .then(response => {
    return Promise.resolve(transformResponse(response));
  });
}
