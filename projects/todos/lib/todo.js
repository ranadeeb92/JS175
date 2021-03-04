const nextId = require('./next-id');

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    // the identifier for this todo object(a numeric value)
    this.id = nextId(); 
    this.title = title;
    this.done = false;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  getId() {
    return this.id;
  }

  isDone() {
    return this.done;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }
}

module.exports = Todo;