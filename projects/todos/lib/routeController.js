const {validationResult} = require("express-validator");
// static data for testing
let todoLists = require('./seed-data');
let TodoList = require('./todolist');

// Sort by title
function sortByTitle(listA, listB) {
  let titleA = listA.getTitle().toLowerCase();
  let titleB = listB.getTitle().toLowerCase();
  if(titleA < titleB) {
    return -1;
  } else if(titleA > titleB) {
    return 1;
  } else {
    return 0
  }
}

function getAllDoneLists(todoLists) {
  return todoLists.filter(list => list.isDone());
}

function getAllUndoneLists(todoLists) {
  return todoLists.filter(list => !(list.isDone()));
}

// return the list of todo lists sorted by completion status and title.
function sortTodoLists(todoLists) {
  let sortedUndoneTodolists =  getAllUndoneLists(todoLists).sort(sortByTitle);
  let sortedDoneTodolists =  getAllDoneLists(todoLists).sort(sortByTitle);
  return [].concat(sortedUndoneTodolists, sortedDoneTodolists);
}


// display the list of all todo lists
const home = (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(todoLists),
  });
}

// back to home page
const backHome = (req, res) => {
  res.redirect('/lists');
}

// Render new todo list page
const NewList = (req, res) => {
  res.render("new-list");
}

// post new list 
const addNewList = (req, res) => {
  let errors = validationResult(req);
  if(!errors.isEmpty()) {
    errors.array().forEach(message => req.flash("error", message.msg));
    res.render('new-list', {
      flash: req.flash(),
      todoListTitle: req.body.todoListTitle
    });
  }
  else {
  todoLists.push(new TodoList(req.body.todoListTitle));
  req.flash("success", "The todo list has been created.")
  res.redirect('/lists');
  }
}

module.exports = {
  home,
  backHome,
  NewList,
  addNewList
}