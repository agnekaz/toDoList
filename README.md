# To Do List (React + TypeScript + Vite)

A simple to‑do list app built with **React**, **TypeScript**, and **Vite**. Tasks can be **added**, **marked as completed**, **deleted**, and are **persisted to `localStorage`** so they stay after refresh.

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

- `src/components/ToDoListPage.tsx`: main page (state + `localStorage` persistence)
- `src/components/Input.tsx`: add-task input form
- `src/components/TaskItemList.tsx`: renders the task list (animated)
- `src/components/TaskItem.tsx`: single task row (checkbox + delete)
- `src/App.scss`: app styles

## Notes

- Tasks are stored under the `localStorage` key **`tasks`**.
