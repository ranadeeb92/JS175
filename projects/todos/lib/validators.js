const {body} = require("express-validator");
const todoLists = require('./seed-data');

const TodoListTitleValidator = [
  body("todoListTitle")
    .trim()
    .isLength({ min: 1})
    .withMessage("The list title is required.")
    .isLength({ max: 100})
    .withMessage("List title must be between 1 and 100 characters.")
    .custom(title => {
      return !(todoLists.some(list => list.getTitle() === title));
    })
    .withMessage("List title must be unique.")
];

const TodoTitleValidator = [
  body("todoTitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("The todo title is required.")
    .isLength({ max: 100 })
    .withMessage("The title must be between 1 and 100 characters.")
];

module.exports = {
  TodoListTitleValidator,
  TodoTitleValidator
}