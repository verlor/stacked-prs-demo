import { useEffect, useState } from "react";
import {
  clearCompleted,
  createTask,
  isValidTaskName,
  removeTask,
  renameTask,
  toggleTask,
} from "../lib/tasks";

const STORAGE_KEY = "todomatic.tasks";

function loadTasks(fallback) {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage can be full or blocked (private mode); the app still works in memory.
  }
}

// Task state that survives a page reload.
export function useTasks(initialTasks) {
  const [tasks, setTasks] = useState(() => loadTasks(initialTasks));

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return {
    tasks,
    addTask(name) {
      if (!isValidTaskName(name)) return;
      setTasks((prev) => [...prev, createTask(name)]);
    },
    toggleTask(id) {
      setTasks((prev) => toggleTask(prev, id));
    },
    renameTask(id, newName) {
      if (!isValidTaskName(newName)) return;
      setTasks((prev) => renameTask(prev, id, newName));
    },
    deleteTask(id) {
      setTasks((prev) => removeTask(prev, id));
    },
    clearCompleted() {
      setTasks((prev) => clearCompleted(prev));
    },
  };
}
