import {
  validateFindByTitle,
  validateTodoExists,
  validateUpdateTodo,
} from "./validate.js";

export function format(todo) {
  return `${todo.id} - [${todo.done ? "x" : " "}] ${todo.title}`;
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

export function complete(store, id) {
  const todo = validateTodoExists(store, id);

  todo.done = true;
  const todos = store.get();
  store.set(todos);
  return todo;
}

export function findByTitle(store, title) {
  validateFindByTitle(store, title);
  const todos = store.get();

  const foundTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase() === title.toLowerCase() ||
      todo.title.toLowerCase().includes(title.toLowerCase())
  );

  return foundTodos;
}

export function updateTitle(store, id, newTitle) {
  validateUpdateTodo(store, id, newTitle);
  const todos = store.get();
  const currentTodo = todos.find((todo) => todo.id === id);
  currentTodo.title = newTitle;
  store.set(todos);
  return currentTodo;
}
