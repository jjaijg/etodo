"use strict";

const { app, ipcMain } = require("electron");
const path = require("path");

// constructors
const Window = require("./Window");
const DataStore = require("./DataStore");

// create new todo store
const todosData = new DataStore({ name: "Todos Main" });

const main = () => {
  // Todo list window
  let mainWindow = new Window({
    file: path.join("renderer", "index.html"),
  });

  // addTodo window, initially doesn't exist
  let addTodoWin;

  // initialize with todos
  mainWindow.once("show", () => {
    mainWindow.webContents.send("todos", todosData.todos);
  });

  // create add todo windows
  ipcMain.on("add-todo-window", () => {
    // if addTodoWin does not already exist
    if (!addTodoWin) {
      // create new add todo win
      addTodoWin = new Window({
        file: path.join("renderer", "add.html"),
        width: 400,
        height: 400,
        parent: mainWindow,
      });

      // cleanup
      addTodoWin.on("closed", () => {
        addTodoWin = null;
      });
    }
  });

  // add todo
  ipcMain.on("add-todo", (e, todo) => {
    const updatedTodos = todosData.addTodos(todo).todos;

    mainWindow.send("todos", updatedTodos);
  });

  // del todo from add todo window
  ipcMain.on("delete-todo", (event, todo) => {
    const updatedTodos = todosData.deleteTodos(todo).todos;

    mainWindow.send("todos", updatedTodos);
  });
};

app.on("ready", main);

app.on("window-all-closed", () => {
  app.quit();
});
