import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if(params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if(typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.')
  }
  return params;
}

export function validateCompleteParams(params) {
  if(params.length !== 1) {
    throw new AppError('Provide an ID as the only parameter in parentheses.');
  }

  const [todoId] = params;

  if(isNaN(todoId)) {
    throw new AppError('Invalid input. Please provide a number as an ID!')
  }

  return Number(todoId);
}

export function validateTodoExists(store, id) {
  const todos = store.get();
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    throw new AppError(`Todo with ID ${id} not found.`);
  }

  return todos[todoIndex];
}