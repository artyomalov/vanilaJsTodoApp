const filterTodos = ({ todos, filterValue, todoPrinter, todoContainer }) => {
  const activeTodos = todos.filter((todo) => !todo.checked);
  const activeTodoCounter = activeTodos.length;
  let filteredTodos = todos;

  if (filterValue === 'completed') {
    filteredTodos = todos.filter((todo) => todo.checked);
  }
  if (filterValue === 'active') {
    filteredTodos = activeTodos;
  }
  return todoPrinter(filteredTodos, todoContainer, activeTodoCounter);
};
export default filterTodos;

// const filterTodos = ({ todos, filterValue, todoPrinter, todoContainer }) => {
//   const activeTodos = todos.filter((todo) => !todo.checked);
//   const activeTodoCounter = activeTodos.length;
//   let todosToRender = todos;

//   if (filterValue === 'completed') {
//     todosToRender = todos.filter((todo) => todo.checked);
//   }

//   if (filterValue === 'active') {
//     completedTodos = activeTodos;
//   }

//   todoPrinter(todosToRender, todoContainer, activeTodoCounter);
// };
// export default filterTodos;
