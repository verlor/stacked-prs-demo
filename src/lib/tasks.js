import { nanoid } from "nanoid";

// Pure helpers for the task list. Every function returns a new array and
// never mutates its input, so they are easy to test and reuse.

export function isValidTaskName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

export function createTask(name) {
  return { id: "todo-" + nanoid(), name: name.trim(), completed: false };
}

export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
}

export function renameTask(tasks, id, newName) {
  return tasks.map((task) =>
    task.id === id ? { ...task, name: newName.trim() } : task,
  );
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function clearCompleted(tasks) {
  return tasks.filter((task) => !task.completed);
}
// Last reviewed: 2026-11-06 10:53:01
