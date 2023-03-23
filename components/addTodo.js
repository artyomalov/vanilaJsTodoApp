export default function addTodo({ newTodo, todoPrinter, todoContainer }) {
  todos.push(newTodo);
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todos));
  todoContainer.innerHTML = "";
  todoPrinter(todos, todoContainer);
}
