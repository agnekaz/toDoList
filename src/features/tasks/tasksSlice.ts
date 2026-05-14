import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from './task';

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const description = action.payload.trim();
      if (!description) return;
      state.push({
        description,
        isCompleted: false,
        id: uuidv4(),
      });
    },
    toggleTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.isCompleted = !task.isCompleted;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskCompleted, deleteTask } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
