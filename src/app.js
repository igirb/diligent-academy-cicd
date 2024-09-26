import { list, formatList, format, add } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams } from './validate.js';

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;
    case "add":
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(["New Todo added:", format(added)]);
      break;

    case "find-by-id":
      const [id] = params;
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new AppError("The ID must be a numeric value.");
      }
      const todo = findById(todoStore, numericId);
      if (!todo) {
        throw new AppError(`Todo with ID ${numericId} not found.`);
      }
      display([format(todo)]);
      break;
      
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
