const express = require('express');
const morgan = require('morgan');
const {body, validationResult} = require("express-validator");
const {Contact, sortContacts, getContacts} = require('./data');
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

// app.post('/contacts/new', (req, res)=> {
//   let errorMessages = [];
//   let newContact = {...req.body};
//   console.log(newContact)
//   for (let key in newContact) {
//     if (newContact[key].length === 0) {
//       errorMessages.push(`${key} is required.`)
//     } 
//   }
//   if(errorMessages.length > 0) {
//     res.render('new-contact',  {
//       errorMessages: errorMessages
//     });
//   } else {
//     new Contact(newContact.firstName, newContact.lastName, newContact.phoneNumber);
//     res.redirect('/contacts')
//   }
// });

app.post('/contacts/new', 
  // Validation-Chains
  // [
  //   body("firstName")
  //     .trim()
  //     .isLength({min : 1})
  //     .withMessage("First name is required.")
  //     .bail()
  //     .isLength({max : 25})
  //     .withMessage("First name is too long. Maximum length is 25 characters")
  //     .isAlpha()
  //     .withMessage("First name contains invalid characters. The name must be alphabetic"),

  //   body("lastName")
  //     .trim()
  //     .isLength({min : 1})
  //     .withMessage("Last name is required.")
  //     .bail()
  //     .isLength({max : 25})
  //     .withMessage("Last name is too long. Maximum length is 25 characters")
  //     .isAlpha()
  //     .withMessage("Last name contains invalid characters. The name must be alphabetic"),

  //   body("phoneNumber")
  //     .trim()
  //     .isLength({min : 1})
  //     .withMessage("Phone number is required")
  //     .bail()
  //     .isMobilePhone("en-US")
  //     .withMessage("Invalid phone number format. Use ###-###-####")

  //],
  (req, res, next) => {
    res.locals.errorMessages = [];
    next()
  },
  (req, res, next) => {
    let newContact = {...req.body};
    for (let key in newContact) {
      if (newContact[key].length === 0) {
        res.locals.errorMessages.push(`${key} is required.`)
      } 
    }
    next();
  },
  (req, res, next) => {
    if(req.body.firstName.length > 25) {
      res.locals.errorMessages.push('Maximun length for firstName is 25 characters');
    }
    if(req.body.lastName.length > 25) {
      res.locals.errorMessages.push('Maximun length for lastName is 25 characters');
    }
    next();
  },
  (req, res, next) => {
    let firstNameMatch = req.body.firstName.match(/[^a-z]+/gi);
    let lastNameMatch = req.body.lastName.match(/[^a-z]+/gi);
    if(firstNameMatch) {
      res.locals.errorMessages.push('First name should contain only alphabetic characters');
    }
    if(lastNameMatch) {
      res.locals.errorMessages.push('Last name should contain only alphabetic characters');
    }
    next();
  },
  (req, res, next) => {
    let inputFullName = req.body.firstName + ' ' + req.body.lastName;
    let contacts = getContacts();
    for (let index = 0; index < contacts.length; index++) {
      let currrentFullName = contacts[index].firstName + ' ' + req.body.lastName;
      if(currrentFullName === inputFullName) {
        res.locals.errorMessages.push('Full name should be unique');
      }
    }
    next();
  },
  (req, res, next) => {
    let phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    if(!phonePattern.test(req.body.phoneNumber)) {
      res.locals.errorMessages.push('Phone numbers must follow the pattern ###-###-####');
    }
    next();
  },
  (req, res, next) => {
    let userInput = {...req.body}
    if(res.locals.errorMessages.length > 0) {
      res.render('new-contact',  {
        errorMessages: res.locals.errorMessages,
        firstName : userInput.firstName,
        lastName : userInput.lastName,
        phoneNumber : userInput.phoneNumber
      });
    } else {
      next();
    }
  },
  (req, res) => {
    let newContact = {...req.body};
    for (key in newContact) {
      newContact[key] = newContact[key].trim();
    }
    new Contact(newContact.firstName, newContact.lastName, newContact.phoneNumber);
    res.redirect('/contacts')
  }

);



app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port ${PORT}...`)
});