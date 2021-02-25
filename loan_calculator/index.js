const START = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="style.css">
  <title>Loan Calculator</title>
</head>
<body>
  <article>
    <h1>Loan Calculator</h1>
    <table>
      <tbody>`;
const END = `</tbody>
    </table>
  </article>
</body>
</html>`;

function greateTable(amount, duration, APR, monthlyPayment) {
  return `<tr>
    <th>Amount:</th>
    <td><a href='/?amount=${amount-100}&duration=${duration}'>-$100</a></td>
    <td>$${amount}</td>
    <td><a href='/?amount=${amount+100}&duration=${duration}'>+$100</a></td>
  </tr>
  <tr>
    <th>Duration:</th>
    <td><a href='/?amount=${amount}&duration=${duration-1}'>- 1 year</a></td>
    <td>${duration} years</td>
    <td><a href='/?amount=${amount}&duration=${duration+1}'>+ 1 year</a></td>
  </tr>
  <tr>
    <th>APR:</th>
    <td>${APR}%</td>
  </tr>
  <tr>
    <th>Monthly Payment:</th>
    <td>$${monthlyPayment.toFixed(2)}</td>
  </tr>
  `;
}

module.exports = {START, END, greateTable};