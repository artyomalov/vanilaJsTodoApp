import todoPrinter from './components/todoPrinter.js';
import getLocalStorageInfo from './components/getLocalStorageInfo.js';
import filterTodos from './components/filterTodos.js';
let todos = [];
let filterValue = localStorage.getItem('filterState') ?? 'all';
const todoContainer = document.querySelector('.app-body');
const todoInput = document.querySelector('.app-header__input');
const addTodoButton = document.querySelector('.app-header__button');
const todoSelector = document.querySelectorAll(
  '.app-header__todo-status-selector'
);
const loadHandler = () => {
  todos = getLocalStorageInfo('todos');
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
  localStorage.setItem('todos', JSON.stringify(todos));
  todoContainer.innerHTML = '';
  todoInput.value = '';

  filterTodos({ todos, filterValue, todoPrinter, todoContainer });
}

const handleTodo = (e) => {
  deleteTodo(e);
  setChecker(e);
};

const deleteTodo = (e) => {
  if (e.target.className === 'app-body_deleteTodo') {
    const filteredTodos = todos.filter((todo) => todo.id != e.target.id);
    todos = filteredTodos;
    localStorage.setItem('todos', JSON.stringify(todos));
    todoContainer.innerHTML = '';
    console.log('filterTodos acted');
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  }
};
const setChecker = (e) => {
  if (e.target.className === 'app-body_checkbox') {
    const checkingTodo = todos.find((todo) => todo.id + 1 == e.target.id);
    checkingTodo.checked = !checkingTodo.checked;
    e.target.checked = checkingTodo.checked;
    localStorage.setItem('todos', JSON.stringify(todos));
    todoContainer.innerHTML = '';
    if (checkingTodo.checked) {
      e.target.className = 'completed';
    } else e.target.className = 'notCompleted';
  }
  filterTodos({ todos, filterValue, todoPrinter, todoContainer });
}; /////////////////не меняется состояние чекера

window.addEventListener('load', loadHandler);

for (const radio of todoSelector) {
  radio.addEventListener('click', () => {
    localStorage.setItem('filterState', radio.value);
    filterValue = radio.value;
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  });
}

addTodoButton.addEventListener('click', () => addTodoHandler());

todoInput.addEventListener('keydown', (e) => {
  if (e.which == 13 || e.keyCode == 13) {
    e.preventDefault();
    addTodoHandler();
  }
});

todoContainer.addEventListener('click', (e) => handleTodo(e));
