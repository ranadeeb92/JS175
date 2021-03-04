const express = require('express');
const morgan = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const routeController = require('./routeController');
const validators = require('./validators');

const app = express();
const HOST = "localhost";
const PORT = 3000;

// view engine
app.set("views", "./views");
app.set("view engine", "pug");

// enable logging 
app.use(morgan('common'));

// static assets
app.use(express.static("public"));

// data format 
app.use(express.urlencoded({ extended: false }));

// session and flash messages
app.use(session({
  name: "launch-school-todos-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not vert secret"
}));

app.use(flash());

// extract session info
app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
});

// routes
// home page
app.get('/', routeController.backHome);

app.get('/lists', routeController.home);

// create a new todo list 
app.post('/lists', validators.TitleValidator, routeController.addNewList)

// get add new list page
app.get('/lists/new', routeController.NewList)

// listener
app.listen(PORT, HOST, () => {
  console.log(`Server listening on port ${PORT} of ${HOST}!`)
});