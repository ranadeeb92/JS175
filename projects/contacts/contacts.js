const express = require('express');
const morgan = require('morgan');
const {Contact, sortContacts} = require('./data');
const PORT = 3000;
const app = express();

// view engine
app.set('views', './views');
app.set('view engine', 'pug');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(morgan('common'));

let contact1 = new Contact('Mike', 'Jones', '281-330-8004');
let contact2 = new Contact('Jenny', 'Keys', '768-867-5309');
let contact3 = new Contact('Max', 'Entiger', '214-748-3647');
let contact4 = new Contact('Alicia', 'Keys', '515-489-4608');


// routes
app.get('/', (req, res) => {
  res.redirect('/contacts');
});

app.get('/contacts', (req, res) => {
  res.render('contacts', {
    contacts: sortContacts()
  })
});

app.get('/contacts/new', (req, res) => {
  res.render('new-contact')
});

app.post('/contacts/new', (req, res)=> {
  let errorMessages = [];
  let newContact = {...req.body};
  console.log(newContact)
  for (let key in newContact) {
    if (newContact[key].length === 0) {
      errorMessages.push(`${key} is required.`)
    } 
  }
  if(errorMessages.length > 0) {
    res.render('new-contact',  {
      errorMessages: errorMessages
    });
  } else {
    new Contact(newContact.firstName, newContact.lastName, newContact.phoneNumber);
    res.redirect('/contacts')
  }
});



app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port ${PORT}...`)
});