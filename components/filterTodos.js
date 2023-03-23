const filterTodos = ({ todos, radio, todoPrinter, todoContainer }) => {
  let filterSelector = "active";

  filterSelector = radio.value;

  if (filterSelector === "completed") {
    const completedTodos = todos.filter((todo) => todo.checked === true);
    todoPrinter(completedTodos, todoContainer);
  } else if (filterSelector === "active") {
    const activeTodos = todos.filter((todo) => todo.checked === false);
    todoPrinter(activeTodos, todoContainer);
  } else todoPrinter(todos, todoContainer);
};
export default filterTodos;
