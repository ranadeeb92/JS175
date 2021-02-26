const LOAN = require('./loan');
const OFFER_TEMPLATE = require('./index');
const FORM_TEMPLATE = require('./form');
const QUERYSTRING = require('querystring');
const PORT = 3000;

function render(template, data) {
  let html = template(data);
  return html;
}

function getParams(path) {
  const myURL = new URL(path, `http://localhost:${PORT}`);
  let searchParams = myURL.searchParams;
  let data = {};
  data.amount = Number(searchParams.get('amount'));
  data.duration = Number(searchParams.get('duration'));
  return data;
}

function parseFormData(request, callback) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let data = QUERYSTRING.parse(body);
    data.amount = Number(data.amount);
    data.duration = Number(data.duration);
    callback(data);
  });
}

function createLoanOffer(data) {
  data.incrementAmount = data.amount + 100;
  data.decrementAmount = data.amount - 100;
  data.incrementDuration = data.duration + 1;
  data.decrementDuration= data.duration - 1;
  data.apr = LOAN.APR;
  data.monthlyPayment = LOAN.getmonthlyPayment(data.amount, data.duration);
  return data;
  
}

function getNotFound(response) {
  response.statusCode = 404;
  response.end();
}

function getIndex(result) {
  let content = render(FORM_TEMPLATE.LOAN_FORM_TEMPLATE, {apr : LOAN.APR});
  result.statusCode = 200;
  result.setHeader('Content-Type', 'text/html');
  result.write(`${content}\n`);
  result.end();
}

function getLoanOffer(result, path) {
  let data = createLoanOffer(getParams(path));
  let content = render(OFFER_TEMPLATE.LOAN_OFFER_TEMPLATE, data)
  result.statusCode = 200;
  result.setHeader('Content-Type', 'text/html');
  result.write(`${content}\n`);
  result.end();
}

function postLoanOffer(request, result) {
  parseFormData(request, parseDtat => {
    let data = createLoanOffer(parseDtat);
    let content = render(OFFER_TEMPLATE.LOAN_OFFER_TEMPLATE, data);
    result.statusCode = 200;
    result.setHeader('Content-Type', 'text/html');
    result.write(`${content}\n`);
    result.end();
  });
}

module.exports = {
  getIndex,
  getLoanOffer,
  postLoanOffer,
  getNotFound
}