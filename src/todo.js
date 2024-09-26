export function format(todo) {
  return `${todo.id} - [${todo.done ? "✅" : " "}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format);
}

function nextId(todos) {
  const ids = todos.map((todo) => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get();
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get();
  const newTodo = {
    title,
    done: false,
    id: nextId(todos),
  };
  const toStore = [...todos, newTodo];
  store.set(toStore);
  return newTodo;
}

export function findByTitle(store, title) {
  const todos = store.get();
  // if (title.length < 3) {
  //   throw new AppError("The title must be at least 3 characters long.");
  // }
  const foundTodos = todos.filter(
    (todo) => todo.title.toLowerCase() === title.toLowerCase()
  );

  return foundTodos;
}
