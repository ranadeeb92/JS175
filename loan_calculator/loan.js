const APR = 5;

function getMonthlyInterestRate() {
  return (APR / 100) / 12;
}

function getLoanDurationInMonths(years) {
  return years * 12;
}

function getmonthlyPayment(amount, duration) {
  let monthyInterest = getMonthlyInterestRate();
  let loanDurationInMonths = getLoanDurationInMonths(duration);
  let monthlyPayment = amount * (monthyInterest / (1 - Math.pow((1 + monthyInterest), (-loanDurationInMonths))))
  return monthlyPayment.toFixed(2);
}

module.exports = {
  getmonthlyPayment,
  APR
}