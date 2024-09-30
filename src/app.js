
import {list, formatList, format, add, complete} from './todo.js';
import {display} from './display.js';
import {AppError} from './app-error.js';
import {validateAddParams, validateCompleteParams, validateTodoExists} from './validate.js';


export function createApp(todoStore, args) {
    const [, , command, ...params] = args;

    switch (command) {
        case 'list':
            const todos = list(todoStore)
            display([...formatList(todos), `You have ${todos.length} todos.`]);
            break;
        case 'add':
            const validated = validateAddParams(params);
            const added = add(todoStore, validated);
            display(['New Todo added:', format(added)])
            break;
        case 'complete':
            const todoId = validateCompleteParams(params);
            const completedTodo = complete(todoStore, todoId);
            display(['Todo completed:', format(completedTodo)]);
            break;
        default:
            throw new AppError(`Unknown command: ${command}`)
    }

}
