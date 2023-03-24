export default function todoPrinter(todos, container, activeTodoCounter) {
  const counter = document.querySelector('.app-header__counter');
  counter.innerHTML = activeTodoCounter;
  if (!todos.length) {
    container.innerHTML = '<h2>No todos</h2>';
    return;
  }
  const displayValue = '';
  container.innerHTML = '';
  todos.forEach((todo) => {
    const checker = todo.checked === true ? 'checked' : '';
    const checkerId = todo.id + 1;
    const editId = todo.id + 2;
    container.insertAdjacentHTML(
      'afterbegin',
      `<div class="app-body_todoItem">
      <input id=${checkerId} type="checkbox" ${checker} class="app-body_checkbox"} />
      <span class="app-body_todoInfo">${todo.text}</span>
      <input class="app-body_todoInput app-body_todoItem-hidden" value ="hello" type="text" />
      <span class="app-body_editTodo" id="${editId}">&#9998;</span>
      <span class="app-body_updateTodo app-body_editButton-hidden" id="${editId}">&check;</span>
      <span class="app-body_deleteTodo" id=${todo.id}>&times;</span>
      </div>`
    );
  });
}
