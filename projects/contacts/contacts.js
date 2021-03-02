const express = require('express');
const morgan = require('morgan');
const {validationResult} = require("express-validator");
const validations = require('./validations');
const session = require('express-session');
const store = require('connect-loki');
const flash = require('express-flash');
const {Contact, sortContacts, addContact, getContacts, clone } = require('./data');
const PORT = 3000;

const app = express();
const LokiStore = store(session);

let contact1 = addContact(new Contact('Mike', 'Jones', '281-330-8004'));
let contact2 = addContact(new Contact('Jenny', 'Keys', '768-867-5309'));
let contact3 = addContact(new Contact('Max', 'Entiger', '214-748-3647'));
let contact4 = addContact(new Contact('Alicia', 'Keys', '515-489-4608'));


// view engine
app.set('views', './views');
app.set('view engine', 'pug');

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(morgan('common'));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000,
    path: "/",
    secure: false,
  },
  name: "launch-school-contacts-manager-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
  store: new LokiStore({}),
}));
app.use(flash());

app.use((req, res, next) => {
  if(!("contactData" in req.session)) {
    req.session.contactData = clone(getContacts());
  }
  next();
});

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
})

// routes
app.get('/', (req, res) => {
  res.redirect('/contacts');
});

app.get('/contacts', (req, res) => {
  res.render('contacts', {
    contacts: sortContacts(req.session.contactData)
  })
});

app.get('/contacts/new', (req, res) => {
  res.render('new-contact')
});

app.post('/contacts/new', 
  // Validation-Chains
  [
    validations.validateName("firstName"),
    validations.validateName("lastName"),
    validations.validatePhoneNumber()

  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      errors.array().forEach(error => req.flash("error", error.msg));
      res.render("new-contact", {
        flash: req.flash(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber 
      });
    } else {
      next();
    }
  },
  (req, res) => {
    req.session.contactData.push(new Contact(req.body.firstName, req.body.lastName, req.body.phoneNumber));
    req.flash("success", "New contact added to list!");
    res.redirect('/contacts')
  });



app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port ${PORT}...`)
});