const filterTodos = ({ todos, filterValue, todoPrinter, todoContainer }) => {
  const activeTodoCounter = todos.filter(
    (todo) => todo.checked === false
  ).length;

  if (filterValue === "completed") {
    const completedTodos = todos.filter((todo) => todo.checked === true);
    todoPrinter(completedTodos, todoContainer, activeTodoCounter);
  } else if (filterValue === "active") {
    const activeTodos = todos.filter((todo) => todo.checked === false);
    todoPrinter(activeTodos, todoContainer, activeTodoCounter);
  } else todoPrinter(todos, todoContainer, activeTodoCounter);
};

export default filterTodos;
