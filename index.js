import todoPrinter from './components/todoPrinter.js';
import getLocalStorageInfo from './components/getLocalStorageInfo.js';
import filterTodos from './components/filterTodos.js';

let todos = [];
let filterValue = localStorage.getItem('filterState') ?? 'all';
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
  if (todoInput.value.trim().length) {
    const newTodo = {
      id: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(),
      text: todoInput.value,
      checked: false,
    };
    const todoList = [...todos, newTodo];
    todos = todoList;
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.value = '';
    filterTodos({ todos, filterValue, todoPrinter, todoContainer });
  }
};

const deleteTodo = (e) => {
  const filteredTodos = todos.filter((todo) => todo.id != e.target.id);
  todos = filteredTodos;
  localStorage.setItem('todos', JSON.stringify(todos));
};

const setChecker = (e) => {
  const checkingTodo = todos.find((todo) => todo.id + 1 == e.target.id);
  checkingTodo.checked = !checkingTodo.checked;
  localStorage.setItem('todos', JSON.stringify(todos));
};

const hideTextClass = 'app-body_todoInfo-hidden';
const hideButtonClass = 'app-body_editButton-hidden';
const buttonParrent = '.app-body_todoItem';
const updateButton = '.app-body_updateTodo';
const todoTitle = '.app-body_todoInfo';
const todoEditorInput = '.app-body_todoInput';

const editTodo = (e) => {
  e.target.classList.add(hideButtonClass);
  const todoBody = e.target.closest(buttonParrent);
  const updateTodoButton = todoBody.querySelector(updateButton);
  updateTodoButton.classList.remove(hideButtonClass);

  const todoText = todoBody.querySelector(todoTitle);
  const todoValue = todoText.innerHTML;
  const todoInput = todoBody.querySelector(todoEditorInput);
  todoInput.classList.remove(hideTextClass);
  todoInput.setAttribute('value', todoValue);

  todoText.classList.add(hideTextClass);

  return { todoInput, todoBody };
};

const updateTodo = (e) => {
  const flag = e.className === 'app-body_todoItem';
  const todoBody = flag === true ? e : e.target.closest(buttonParrent);
  const todoText = todoBody.querySelector(todoTitle);
  const todoId = todoBody.querySelector('.app-body_deleteTodo').id;
  const todoInput = todoBody.querySelector(todoEditorInput);
  if (todoInput.value.trim().length) {
    const editedTodo = todos.find((todo) => todo.id === todoId);
    editedTodo.text = todoInput.value;
    localStorage.setItem('todos', JSON.stringify(todos));
    todoInput.classList.add(hideTextClass);
    todoText.classList.remove(hideTextClass);
    todoBody.querySelector(updateButton).classList.remove(hideButtonClass);
    todoBody
      .querySelector('.app-body_editTodo')
      .classList.remove(hideButtonClass);
    return true;
  }
  return false;
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
    const { todoInput, todoBody } = editTodo(e);
    todoInput.addEventListener('keydown', (e) => {
      if (e.which == 13 || e.keyCode == 13) {
        e.preventDefault();
        const todoUpdater = updateTodo(todoBody);
        if (todoUpdater) {
          filterTodos({ todos, filterValue, todoPrinter, todoContainer });
        }
      }
    });
    todoInput.addEventListener('blur', (e) => {
      const todoUpdater = updateTodo(todoBody);
      if (todoUpdater) {
        filterTodos({ todos, filterValue, todoPrinter, todoContainer });
      }
    });
  }
  if (e.target.className === 'app-body_updateTodo') {
    const todoUpdater = updateTodo(e);

    if (todoUpdater) {
      filterTodos({ todos, filterValue, todoPrinter, todoContainer });
    }
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
