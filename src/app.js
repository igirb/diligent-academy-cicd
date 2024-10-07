import {
    list, formatList, format, add, complete, findByTitle, updateTitle, findByStatus, addLabel, deleteLabel,
} from "./todo.js";
import {display} from "./display.js";
import {AppError} from "./app-error.js";
import {
    validateAddParams,
    validateCompleteParams,
    validateFindByTitle,
    validateFindById,
    validateUpdateTodo,
    validateFindByStatus,
    validateLabelParams,
} from "./validate.js";

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
        case "complete":
            const todoId = validateCompleteParams(params);
            const completedTodo = complete(todoStore, todoId);
            display(["Todo completed:", format(completedTodo)]);
            break;
        case "find-by-id":
            const id = validateFindById(params);
            const foundTodo = findById(todoStore, id);
            display(["Found todo:", format(foundTodo)]);
            break;
        case "find-by-title":
            const [title] = params;
            validateFindByTitle(params, title);
            const foundTodos = findByTitle(todoStore, title);
            display(["Found todos:", foundTodos.length > 0 ? formatList(foundTodos) : "No todos found with this title",]);
            break;
        case "update-title":
            const [todoid, newTitle] = params;
            const validatedTodoId = validateCompleteParams([todoid]);
            validateUpdateTodo(todoStore, validatedTodoId, newTitle);
            const updatedTodo = updateTitle(todoStore, validatedTodoId, newTitle);
            display(["Updated todo:", format(updatedTodo)]);
            break;
        case "add-label":
            const [todoIdLabel, label] = validateLabelParams(params);
            const labelledTodo = addLabel(todoStore, todoIdLabel, label);
            display(["Label added to todo:", format(labelledTodo)]);
            break;
        case "delete-label":
            const todoWithDeletedLabel = deleteLabel(todoStore, ...validateLabelParams(params));
            display(["Label deleted from todo:", format(todoWithDeletedLabel)]);
            break;
        case "find-by-status":
            const [status] = params;
            validateFindByStatus(todoStore, status);
            const foundTodosByStatus = findByStatus(todoStore, status);
            display(["Found todos:", formatList(foundTodosByStatus)]);
            break;
        default:
            throw new AppError(`Unknown command: ${command}`);
    }
}
