const express = require('express');
const {CountryData} = require('./data');
const reqHandlers = require('./handlers');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

let countriesData = [];
countriesData.push(new CountryData('/english', 'flag-of-United-States-of-America.png', 'US Flag', "GO to US English site"));
countriesData.push(new CountryData('/french', 'flag-of-France.png', 'Drapeau de la france Flag', "Aller sur le site français"));
countriesData.push(new CountryData('/serbian', 'flag-of-Serbia.png', 'Застава Србије', "Идите на српски сајт"));
countriesData.push(new CountryData('/arabic', 'flag-of-Syria.png', 'اذهب للموقع السوري العربي', 'علم سورية'));


app.set("view engine" , "pug");
app.set('views', "./views");

app.use(express.static('public'));
app.use(morgan('common'));

app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? 'current' : '';
}

app.get('/', (req, res) => {
  res.redirect('/english');
});

app.get('/:language', reqHandlers.helloWorld(countriesData));


// error handler
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(PORT, "localhost", () => {
  console.log(`Server listening on port number ${PORT}...`);
});