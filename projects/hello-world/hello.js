const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.set("view engine" , "pug");
app.set('views', "./views");

app.use(express.static('public'));
app.use(morgan('common'));

// const writeLog = (req, res) => {
//   let timeStamp = String(new Date()).substring(4, 24);
//   console.log(`${timeStamp} ${req.method} ${req.originalUrl} ${res.statusCode}`);
// }

app.get('/', (req, res) => {
  res.redirect('/english');
  // writeLog(req, res);
});

app.get('/english', (req, res)=> {
  res.render('hello-world-english');
  // writeLog(req, res);
});

app.get('/french', (req, res)=> {
  res.render('hello-world-french');
  // writeLog(req, res);
});

app.get('/serbian', (req, res)=> {
  res.render('hello-world-serbian');
  // writeLog(req, res);
});

app.get('/arabic', (req, res)=> {
  res.render('hello-world-arabic');
});

app.listen(PORT, "localhost", () => {
  console.log(`Server listening on port number ${PORT}...`);
});