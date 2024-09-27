import { list, formatList, format, add, findByTitle } from "./todo.js";
import { display } from "./display.js";
import { AppError } from "./app-error.js";
import { validateAddParams } from "./validate.js";

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

    case "find-by-title":
      const [title] = params;
      const foundTodos = findByTitle(todoStore, title);
      if (title.length < 3) {
        throw new AppError("The title must be at least 3 characters long.");
      }
      display([
        "Found todos:",
        foundTodos.length > 0
          ? formatList(foundTodos)
          : "No todos found with this title",
      ]);
      break;

    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
