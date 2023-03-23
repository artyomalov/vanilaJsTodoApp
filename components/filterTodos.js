const filterTodos = ({ todos, filterValue, todoPrinter, todoContainer }) => {
  const completedTodos = todos.filter((todo) => todo.checked === true);
  const activeTodos = todos.filter((todo) => todo.checked === false);
  const activeTodoCounter = activeTodos.length;
  // console.log(filterValue);
  if (filterValue === "completed") {
    todoPrinter(completedTodos, todoContainer, activeTodoCounter);
  } else if (filterValue === "active") {
    // const activeTodos = todos.filter((todo) => todo.checked === false);
    todoPrinter(activeTodos, todoContainer, activeTodoCounter);
  } else todoPrinter(todos, todoContainer, activeTodoCounter);
};
export default filterTodos;
