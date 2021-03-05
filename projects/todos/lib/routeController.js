const {validationResult} = require("express-validator");
const {sort} = require('./sort');
// static data for testing
let todoLists = require('./seed-data');
let TodoList = require('./todolist');
let Todo = require('./todo');
const flash = require("express-flash");

function loadTodoList(todoListId) {
  return todoLists.find(todoList => todoList.id === todoListId);
}

function loadTodo(todoListId, todoId) {
  let todoList = loadTodoList(todoListId);
  return !todoList ? undefined : todoList.findById(todoId);
}

function removeTodo(todoListId, todo) {
  let todoList = loadTodoList(todoListId);
  todoList.removeAt(todoList.findIndexOf(todo));
}
// display the list of all todo lists
const home = (req, res) => {
  res.render("lists", {
    todoLists: sort(todoLists),
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

// disply all todos in a todo list
const getList = (req, res, next)=> {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId);
  if(todoList === undefined) {
    next(new Error("Not Found."));
  } else {
    res.render("list", {
      todoList,
      todos: sort(todoList.todos)
    })
  }
}

// toggle todo
const toggleTodo = (req, res, next) => {
  let {todoListId, todoId} = req.params;
  let todo = loadTodo(+todoListId, +todoId);
  if(todo === undefined) {
    next(new Error("Not Found"))
  } else {
    if(todo.isDone()) {
      todo.markUndone();
      req.flash("success", `"${todo.getTitle()}" marked as Not done!`);
    }else {
      todo.markDone();
      req.flash("success", `"${todo.getTitle()}" marked as done!`);
    }
    res.redirect(`/lists/${todoListId}`);
  }  
}

// delete todo
const deleteTodo = (req, res, next) => {
  let {todoListId, todoId} = req.params;
  let todo = loadTodo(+todoListId, +todoId);
  if(todo === undefined) {
    next(new Error ("Not Found"));
  } else {
    let title = todo.getTitle();
    removeTodo(+todoListId, todo);
    req.flash("success", `"${title}" was deleted!`);
    res.redirect(`/lists/${todoListId}`);
  }
}

// complete all todos for a specific list
const completeAll= (req, res, next) => {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId);
  if(todoList === undefined) {
    next(new Error ("Not Found"));
  } else {
    todoList.markAllDone();
    req.flash("success", `All "${todoList.getTitle()}" marked as done!`)
    res.redirect(`/lists/${todoListId}`);
  }
}


// add new todo to a specific todo list
const addNewTodo = (req, res, next) => {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId);
  let errors = validationResult(req);
  if(todoList === undefined) {
    next(new Error("Not Found."));
  } else if(!errors.isEmpty()) {
    errors.array().forEach(message => req.flash('error', message.msg));
    res.render('list', {
      flash: req.flash(),
      todoList,
      todos: sort(todoList.todos)
    })
  } else {
    todoList.add(new Todo(req.body.todoTitle));
    req.flash("success", `New "${req.body.todoTitle}" was created!`)
    res.redirect(`/lists/${todoListId}`);
  }
}
// get edit list
const editList = (req, res, next) => {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId);
  if(todoList === undefined) {
    next(new Error("Not Found."))
  } else {
    res.render('edit-list', {
      todoList
    });
  }
}
// post edit list
const edit = (req, res, next) => {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId);
  if(todoList === undefined) {
    next(new Error("Not Found."))
  } else {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      errors.array().forEach(message => req.flash('error', message.msg));
      res.render("edit-list", {
        flash: req.flash(),
        todoListTitle: req.body.todoListTitle,
        todoList
      });
    }else {
      todoList.setTitle(req.body.todoListTitle);
      req.flash('success', "Todo list's name updated!");
      res.redirect(`/lists/${todoListId}`);
    }
  }
}

// delete a list
const deleteAList = (req, res, next) => {
  let todoListId = req.params.todoListId;
  let indexOfTodoList = todoLists.findIndex(list => list.id === +todoListId);
  if(indexOfTodoList === -1) {
    next(new Error("Not Found."))
  } else {
    todoLists.splice(indexOfTodoList, 1);
    req.flash('success', 'Todo list deleted!')
    res.redirect('/lists')
  }
}

module.exports = {
  home,
  backHome,
  NewList,
  addNewList,
  getList,
  toggleTodo,
  deleteTodo,
  completeAll,
  addNewTodo,
  editList,
  deleteAList,
  edit
}