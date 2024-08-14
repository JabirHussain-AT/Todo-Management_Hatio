# Todo Project Manager

## Overview
This application we focoused on todo management based on projects, we can create multiple projects and add project based todos with completion status and added feature of 
view as gist ( report ) and you can also download the gist file too.

## Features
- User authentication (Basic Auth) - added signup page with otp and also login page with ( jsonwebtoken )
- Create and manage projects
- Add, edit, update, and mark todos as complete within projects
- Export project summaries as secret GitHub Gists
- Local storage of exported Gist files

## Tech Stack
- Backend: NodeJs with Frameworks of Express
- Frontend: React
- Database: MongoDb

## Setup Instructions
-clone the repository
- npm init 

### Backend Setup
1. Clone the repository:
   - npm init / npm install
   - npm start / npm run dev

2. ### Frontend Setup
    - Navigate to the frontend directory:
    - npm run dev


## API Endpoints
- POST `/api/auth/login`: User login
- GET `/api/projects`: List all projects
- POST `/api/projects`: Create a new project
- GET `/api/projects/{id}`: View a specific project
- PUT `/api/projects/{id}`: Update a project
- DELETE `/api/projects/{id}`: Delete a project
- POST `/api/projects/{id}/todos`: Add a new todo to a project
- PUT `/api/projects/{id}/todos/{todoId}`: Update a todo
- DELETE `/api/projects/{id}/todos/{todoId}`: Remove a todo
- POST `/api/projects/{id}/export`: Export project summary as a GitHub Gist



## Gist Export Format
Exported Gists follow this format:
- Filename: `<Project title>.md`
- Content:
```markdown
# Project Title

Summary: X / Y completed

## Pending Todos
- [ ] Todo 1
- [ ] Todo 2

## Completed Todos
- [x] Todo 3
- [x] Todo 4
