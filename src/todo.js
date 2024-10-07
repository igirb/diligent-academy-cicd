import {
    validateFindByTitle,
    validateTodoExists,
    validateUpdateTodo,
} from "./validate.js";
import {AppError} from "./app-error.js";

export function format(todo) {
    return `${todo.id} - [${todo.done ? "x" : " "}] (${todo.labels}) ${todo.title}`;
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
        labels: [],
    };
    const toStore = [...todos, newTodo];
    store.set(toStore);
    return newTodo;
}

export function complete(store, id) {
    const todos = store.get();
    const todo = validateTodoExists(store, id);
    todo.done = true;

    const index = todos.findIndex((todo) => todo.id === id);
    todos[index] = todo;

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
    const currentTodo = validateTodoExists(store, id);
    currentTodo.title = newTitle;
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? currentTodo : todo
    );
    store.set(updatedTodos);
    return currentTodo;
}

export function findById(store, id) {
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
        throw new AppError("The ID must be a numeric value.");
    }

    const todos = store.get();
    const todo = todos.find((todo) => todo.id === numericId);

    if (!todo) {
        throw new AppError(`No todo found with ID: ${numericId}`);
    }

    return todo;
}

export function addLabel(store, id, label) {
    const todos = store.get();
    const todo = validateTodoExists(store, id);

    if (!todo.labels) {
        todo.labels = [];
    }

    if (!todo.labels.includes(label)) {
        todo.labels.push(label);
    }

    const index = todos.findIndex((todo) => todo.id === id);
    todos[index] = todo;

    store.set(todos);

    return todo;
}

export function findByStatus(store, status) {
    const todos = store.get();
    let foundTodosByStatus;
    if (status === "done") {
        foundTodosByStatus = todos.filter((todo) =>
            todo.done === true ? todo : ""
        );
    } else if (status === "not-done") {
        foundTodosByStatus = todos.filter((todo) =>
            todo.done !== true ? todo : ""
        );
    }

    return foundTodosByStatus;
}
