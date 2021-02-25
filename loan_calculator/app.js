const HTTP = require('http');
const URL = require('url').URL;
const HTML = require('./index');
const STYLE =  require('./style');
const PORT = 3000;
const APR = 5;

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  return myURL.searchParams;
}

function getMonthlyInterestRate() {
  return (APR / 100) / 12;
}

function getLoanDurationInMonths(years) {
  return years * 12;
}


function monthlyPaymentReport(params) {
  let loanAmount = Number(params.get('amount'));
  let loanDurationInYears = Number(params.get('duration'));

  let monthyInterest = getMonthlyInterestRate();
  let loanDurationInMonths = getLoanDurationInMonths(loanDurationInYears);
  let monthlyPayment = loanAmount * (monthyInterest / (1 - Math.pow((1 + monthyInterest), (-loanDurationInMonths))))
  return HTML.greateTable(loanAmount, loanDurationInYears, APR, monthlyPayment);
  
}

const SERVER = HTTP.createServer((req, res) => {
  let path = req.url;
  let content = monthlyPaymentReport(getParams(path));

  if(path === '/style.css') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    res.write(STYLE);
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(HTML.START+content+HTML.END);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}....`);
});