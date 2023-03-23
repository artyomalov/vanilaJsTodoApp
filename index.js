import todoPrinter from "./components/todoPrinter.js";
import getLocalStorageInfo from "./components/getLocalStorageInfo.js";
import filterTodos from "./components/filterTodos.js";
// import addTodo from "./components/addTodo.js";
let todos = [];
const todoContainer = document.querySelector(".app-body");
const todoInput = document.querySelector(".app-header__input");
const addTodoButton = document.querySelector(".app-header__button");

const loadHandler = () => {
  todos = getLocalStorageInfo("todos");
  todoPrinter(todos, todoContainer, deleteTodo);
};

function addTodoHandler() {
  const newTodo = {
    id: Date.now(),
    text: todoInput.value,
    checked: false,
  };
  const todoList = [...todos, newTodo];
  todos = todoList;
  localStorage.setItem("todos", JSON.stringify(todos));
  todoContainer.innerHTML = "";
  todoInput.value = "";
  todoPrinter(todos, todoContainer, deleteTodo);
}

const handleTodo = (e) => {
  deleteTodo(e);
  setChecker(e);
};

const deleteTodo = (e) => {
  if (e.target.className === "app-body_deleteTodo") {
    const filteredTodos = todos.filter((todo) => todo.id != e.target.id);
    todos = filteredTodos;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoContainer.innerHTML = "";
    todoPrinter(todos, todoContainer, deleteTodo);
  }
};
const setChecker = (e) => {
  if (e.target.className === "app-body_checkbox") {
    const checkingTodo = todos.find((todo) => {
      return todo.id + 1 == e.target.id;
    });
    checkingTodo.checked = !checkingTodo.checked;
    e.target.checked = checkingTodo.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoContainer.innerHTML = "";
    if (checkingTodo.checked) {
      e.target.className = "completed";
    } else e.target.className = "notCompleted";
    todoPrinter(todos, todoContainer);
  }
}; /////////////////не меняется состояние чекера

window.addEventListener("load", loadHandler);
addTodoButton.addEventListener("click", () => addTodoHandler());
todoInput.addEventListener("keydown", (e) => {
  if (e.which == 13 || e.keyCode == 13) {
    e.preventDefault();
    addTodoHandler();
  }
});
todoContainer.addEventListener("click", (e) => handleTodo(e));

const todoSelector = document.querySelectorAll(
  ".app-header__todo-status-selector"
);

for (const radio of todoSelector) {
  radio.addEventListener("click", () =>
    filterTodos({ todos, radio, todoPrinter, todoContainer })
  );
}
