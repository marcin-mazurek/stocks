module.exports = function convertToGoogleChartsFormat(response) {
  const companies = Object.keys(response);
  const result = [];
  const dates = Object.keys(response[companies[0]]);
  
  dates.forEach(date => {
    const stockHistory = [];
    companies.forEach(company => {
      stockHistory.push(response[company][date]);
    });

    result.push([date, ...stockHistory]);
  });

  result.push(['Date', ...companies]);
  result.reverse();

  return result;
};
