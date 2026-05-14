import { configureStore } from '@reduxjs/toolkit';
import type { Task } from '../features/tasks/task';
import { tasksReducer } from '../features/tasks/tasksSlice';
import { loadTasksFromStorage, TASKS_STORAGE_KEY } from './tasksStorage';

type TasksRootState = { tasks: Task[] };

export function setupStore(overrides?: Partial<TasksRootState>) {
  const tasks = overrides?.tasks ?? loadTasksFromStorage();
  const store = configureStore({
    reducer: { tasks: tasksReducer },
    preloadedState: { tasks },
  });

  store.subscribe(() => {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(store.getState().tasks),
    );
  });

  return store;
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
