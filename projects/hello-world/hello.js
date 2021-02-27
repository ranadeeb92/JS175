const express = require('express');
const app = express();
const PORT = 3000;

app.set("view engine" , "pug");
app.set('views', "./views");

app.get('/', (req, res) => {
  res.render('hello-world-english.pug')
});


app.listen(PORT, "localhost", () => {
  console.log(`Server listening on port number ${PORT}...`);
});