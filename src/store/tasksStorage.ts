import type { Task } from '../features/tasks/task';

export const TASKS_STORAGE_KEY = 'tasks';

export function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    const parsed: unknown = JSON.parse(raw);
    if (!raw) return [];
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}
