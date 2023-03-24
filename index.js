import todoPrinter from './components/todoPrinter.js';
import getLocalStorageInfo from './components/getLocalStorageInfo.js';
import filterTodos from './components/filterTodos.js';
let todos = [];
let filterValue = localStorage.getItem('filterState') ?? 'all';
let todoId = 0;
let editSetter = false;
const todoContainer = document.querySelector('.app-body');
const todoInput = document.querySelector('.app-header__input');
const addTodoButton = document.querySelector('#addButton');
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

const addTodoHandler = () => {
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
};

const deleteTodo = (e) => {
  const filteredTodos = todos.filter((todo) => todo.id != e.target.id);
  todos = filteredTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
  todoContainer.innerHTML = '';
};
const setChecker = (e) => {
  const checkingTodo = todos.find((todo) => todo.id + 1 == e.target.id);
  checkingTodo.checked = !checkingTodo.checked;
  localStorage.setItem('todos', JSON.stringify(todos));
  if (checkingTodo.checked) {
    e.target.className = 'completed';
  } else e.target.className = 'notCompleted';
};

const editTodo = (e) => {
  e.target.classList.add('app-body_editButton-hidden');
  const todoBody = e.target.parentNode;
  todoBody
    .querySelector('.app-body_updateTodo')
    .classList.remove('app-body_editButton-hidden');
  const todoText = todoBody.querySelector('.app-body_todoInfo');
  const todoValue = todoText.innerHTML;
  const todoInput = todoBody.querySelector('.app-body_todoInput');
  todoInput.classList.remove('app-body_todoItem-hidden');
  todoText.classList.add('app-body_todoItem-hidden');
  todoInput.setAttribute('value', todoValue);
  todoInput.value = todoValue;

  todoInput.addEventListener('keydown', (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      e.preventDefault();
      updateTodo(e);
      filterTodos({ todos, filterValue, todoPrinter, todoContainer });
    }
  });
};

const updateTodo = (e) => {
  e.target.classList.add('app-body_editButton-hidden');
  const todoBody = e.target.parentNode;
  todoBody
    .querySelector('.app-body_editTodo')
    .classList.remove('app-body_editButton-hidden');
  const todoText = todoBody.querySelector('.app-body_todoInfo');
  const todoId = todoBody.querySelector('.app-body_deleteTodo').id;
  const todoInput = todoBody.querySelector('.app-body_todoInput');

  const editedTodo = todos.find((todo) => todo.id === Number(todoId));
  editedTodo.text = todoInput.value;
  localStorage.setItem('todos', JSON.stringify(todos));
  todoInput.classList.add('app-body_todoItem-hidden');
  todoText.classList.remove('app-body_todoItem-hidden');
};

const handleTodo = (e) => {
  if (e.target.className === 'app-body_deleteTodo') {
    deleteTodo(e);
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  }
  if (e.target.className === 'app-body_checkbox') {
    setChecker(e);
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  }
  if (e.target.className === 'app-body_editTodo') {
    editTodo(e);
  }
  if (e.target.className === 'app-body_updateTodo') {
    updateTodo(e);
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  }
};

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
