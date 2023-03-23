import filterTodos from "./filterTodos.js";

export default function todoPrinter(todos, container) {
  if (!todos.length) {
    container.innerHTML = "<h2>No todos</h2>";
    return;
  }

  const counter = document.querySelector(".app-header__counter");
  const activeTodoCounter = todos.filter((todo) => todo.checked === false);
  counter.innerHTML = activeTodoCounter.length;
  container.innerHTML = "";
  todos.forEach((todo) => {
    const checkerId = todo.id + 1;
    container.insertAdjacentHTML(
      "afterbegin",
      `<div class="app-body_todoItem">
      <input id=${checkerId} type="checkbox" class="app-body_checkbox"}>
      <span class="app-body_todoInfo">${todo.text}</span>
      <span class="app-body_deleteTodo" id=${todo.id}>&times;</span>
    </div>`
    );
  });
}
