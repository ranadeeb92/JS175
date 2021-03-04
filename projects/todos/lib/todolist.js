const Todo = require("./todo");
const nextId = require('./next-id');

class TodoList {
  constructor(title) {
    this.id = nextId();
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if(todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError ('Can only add todo objects');
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  _validateIndex(index) {
    if(!(index in this.todos)) {
      throw new ReferenceError(`Invalid index : ${index}`);
    }
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.size() && this.todos.every(item => item.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];

  }

  toString() {
    let title = `---${this.title}---`;
    let list = this.todos.map(item => item.toString()).join('\n');
    return `${title}\n${list}`;
  }

  forEach(callback){
    for(let index = 0; index < this.size(); index++) {
      callback(this.todos[index]);
    }
  }

  filter(callback) {
    let newList = new TodoList(this.title);
    for(let index = 0; index < this.size(); index++) {
      if(callback(this.todos[index])) {
       newList.add(this.todos[index]);
      }
    }
    return newList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  findById(id) {
    return this.filter(todo => todo.getId() === id).first();
  }

  findIndexOf(todoToFind) {
    let findId = todoToFind.getId();
    return this.todos.findIndex(todo => todo.getId() === findId);
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !(todo.isDone()));
  }

  allTodos() {
    return this.filter(_=> true);
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if(todo !== undefined) {
      todo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
  

}

module.exports = TodoList;