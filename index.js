import todoPrinter from "./components/todoPrinter.js";
import getLocalStorageInfo from "./components/getLocalStorageInfo.js";
import filterTodos from "./components/filterTodos.js";
// import addTodo from "./components/addTodo.js";
let todos = [];
const todoContainer = document.querySelector(".app-body");
const todoInput = document.querySelector(".app-header__input");
const addTodoButton = document.querySelector(".app-header__button");
const filterValue = localStorage.getItem("filterState") ?? "all";
console.log(filterValue);
const todoSelector = document.querySelectorAll(
  ".app-header__todo-status-selector"
);

const loadHandler = () => {
  todos = getLocalStorageInfo("todos");
  for (let radio of todoSelector) {
    if (radio.value === filterValue) {
      radio.checked = true;
    }
  }
  filterTodos({ todos, filterValue, todoPrinter, todoContainer });
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
    const checkingTodo = todos.find((todo) => todo.id + 1 == e.target.id);
    checkingTodo.checked = !checkingTodo.checked;
    e.target.checked = checkingTodo.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
    todoContainer.innerHTML = "";
    if (checkingTodo.checked) {
      e.target.className = "completed";
    } else e.target.className = "notCompleted";
  }
  filterTodos({ todos, filterValue, todoPrinter, todoContainer });
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

for (const radio of todoSelector) {
  radio.addEventListener("click", () => {
    localStorage.setItem("filterState", radio.value);
    const filterValue = radio.value;
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  });
}
