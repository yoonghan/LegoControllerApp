export const move = (array, fromIndex, toIndex) => {
  return array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

export findTodo = (todo, todoList) => {
  return todoList.find((item) => item.title.toLowerCase() === todo.title.toLowerCase());
}
