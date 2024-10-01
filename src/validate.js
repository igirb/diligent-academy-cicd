import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError("Give a title as the only parameter in parenthesis.");
  }
  const [title] = params;
  if (typeof title !== "string" || title?.length === 0) {
    throw new AppError("The title must be a non zero length string.");
  }
  return params;
}

export function validateCompleteParams(params) {
  if (params.length !== 1) {
    throw new AppError("Provide one number as ID.");
  }

  const [todoId] = params;

  if (isNaN(todoId)) {
    throw new AppError("Invalid input. Please provide a number as an ID!");
  }

  return Number(todoId);
}

export function validateTodoExists(store, id) {
  const todos = store.get();
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    throw new AppError(`Todo with ID ${id} not found.`);
  }

  return todos[todoIndex];
}

export function validateFindByTitle(store, title) {
  if (title.length < 3) {
    throw new AppError("The title must be at least 3 characters long.");
  }
}

export function validateFindById(params) {
  if (params.length !== 1) {
    throw new AppError(
      "Invalid number of parameters for 'find-by-id'. Expected 1 parameter."
    );
  }

  const id = parseInt(params[0], 10);

  if (isNaN(id)) {
    throw new AppError("The ID must be a numeric value.");
  }

  return id;
}

export function validateUpdateTodo(store, id, newTitle) {
  if (!id || isNaN(id)) {
    throw new AppError("Provide a valid id number.");
  }
  if (!newTitle) {
    throw new AppError("The new title must be at least 1 character long.");
  }
}
