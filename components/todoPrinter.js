export default function todoPrinter(todos, container, activeTodoCounter) {
  const counter = document.querySelector('.app-header__counter');
  counter.innerHTML = activeTodoCounter;
  if (!todos.length) {
    container.innerHTML = '<h2>No todos</h2>';
    return;
  }
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
      <span class="app-body_deleteTodo" id=${todo.id}>&times;</span>
      <span class="app-body_editTodo" id="${editId}">&#9998;</span>
      </div>`
    );
  });
}
