# FIbsaac's Task Manager

A full-stack task management application built with React, Flask, and SQLite.

## Features

- Create new tasks
- View saved tasks
- Mark tasks as completed
- Delete tasks
- Tasks remain saved after refreshing the page
- React frontend connected to a Flask REST API
- SQLite database for persistent storage

## Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- Flask
- Flask-CORS
- SQLite
- REST API

## How It Works

The React frontend provides the user interface for managing tasks.

The Flask backend provides REST API endpoints that handle creating, retrieving, updating, and deleting tasks.

SQLite stores the tasks so that they remain available after the application is refreshed.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/<id>` | Update a task |
| DELETE | `/tasks/<id>` | Delete a task |

## Running the Project Locally

### 1. Start the Flask backend

```bash
cd backend
python3 app.py
```

The backend runs on:

`http://127.0.0.1:5000`

### 2. Start the React frontend

Open another Terminal window:

```bash
cd task-manager
npm run dev
```

The frontend runs on the local Vite address shown in the Terminal.

## Project Structure

```text
task-manager/
├── backend/
│   └── app.py
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── ...
├── .gitignore
├── package.json
└── README.md
```

## What I Learned

This project helped me practice building a full-stack application, connecting a React frontend to a Flask REST API, working with SQLite, handling CRUD operations, and using Git and GitHub for version control.# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
