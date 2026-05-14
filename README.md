# To Do List (React + TypeScript + Vite)

A simple to‑do list app built with **React**, **TypeScript**, and **Vite**. Tasks can be **added**, **marked as completed**, **deleted**, and are **persisted to `localStorage`** so they stay after refresh.

## Live demo

- **Deployed app**: [https://to-do-list-mu-flame.vercel.app/](https://to-do-list-mu-flame.vercel.app/)

## Features

- **Add tasks**: type a task and press Enter (or click the submit button)
- **Complete tasks**: toggle the checkbox
- **Delete tasks**: remove tasks with the delete button
- **Persistence**: tasks are saved in the browser via `localStorage`
- **Nice UI**: SCSS styling and [Font Awesome](https://fontawesome.com/v4/) icons

## Tech stack

- **React 19**
- **TypeScript**
- **Vite**
- **SCSS** (Sass)
- **motion** (for list/item animations)
- **uuid** (task ids)

## Getting started

### Prerequisites

- **Node.js** (recommended: latest LTS)
- **npm**

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL printed in your terminal.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # typecheck + production build
npm run preview   # preview production build locally
npm run lint      # run ESLint
```

## Project structure (high level)

The UI for this app lives under **`src/features/`** (the root `App` imports `src/features/ToDoListPage.tsx`).

- `src/features/ToDoListPage.tsx`: main page (state + `localStorage` persistence)
- `src/features/Input.tsx`: add-task input form
- `src/features/tasks/TaskItemList.tsx`: renders the task list (animated)
- `src/features/tasks/TaskItem.tsx`: single task row (checkbox + delete)
- `src/features/tasks/task.ts`: `Task` type
- `src/App.scss`: app styles

A legacy copy of some files may still exist under `src/components/`; the running app uses **`src/features/`** only.

### Redux — Step 2: folder layout (when you add the store)

Keep **global Redux wiring** separate from **feature code**:

| Path | Purpose |
|------|--------|
| `src/store/store.ts` | `configureStore`, export `store`, `RootState`, `AppDispatch` |
| `src/store/hooks.ts` | Typed `useAppDispatch` and `useAppSelector` |
| `src/features/tasks/tasksSlice.ts` | `createSlice` for tasks (import the `Task` type from `./task` in the same folder) |

**Why `tasksSlice.ts` sits in `src/features/tasks/`**  
That folder already holds task types and presentational pieces (`task.ts`, `TaskItem*.tsx`). Co-locating the slice there keeps everything for the “tasks” domain in one place. **`src/store/`** stays limited to store creation and typed hooks so it stays easy to find and does not mix domain logic with wiring.

**Alternative**  
If you prefer a flatter tree, you can use `src/store/tasksSlice.ts` instead; the important part is one clear place for the slice and a dedicated `src/store/` for `configureStore` and hooks.

## Notes

- Tasks are stored under the `localStorage` key **`tasks`**.
