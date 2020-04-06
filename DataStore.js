// Electron Store

const Store = require("electron-store");

class DataStore extends Store {
  constructor(settings) {
    super(settings);

    // initialize with todos or empty arry
    this.todos = this.get("todos") || [];
  }

  saveTodos = () => {
    // save todos to json file
    this.set("todos", this.todos);

    // returning this allows method chaining
    return this;
  };

  getTodos = () => {
    this.todos = this.get("todos") | [];

    return this;
  };

  addTodos = todo => {
    this.todos = [...this.todos, todo];

    return this.saveTodos();
  };

  deleteTodos = todo => {
    this.todos = this.todos.filter(t => t !== todo);

    return this.saveTodos();
  };
}

module.exports = DataStore;
