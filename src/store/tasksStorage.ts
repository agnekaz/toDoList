import type { Task } from '../features/tasks/task';

export const TASKS_STORAGE_KEY = 'tasks';

export function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}
