# TaskSphere

**TaskSphere** is a task and project management application inspired by tools like **Atlassian Jira**, designed to help teams break down projects into manageable stages such as **To Do, In Progress, Done, and Review**.

---

## Technologies Used

- **Project and Time Management:** Jira

- **API Design:** Notion

- **Database Design:** DB.diagram.io

- **Backend:** NestJS

- **Database:** PostgreSQL

- **Cache:** Redis

---

# API Design

## Authentication & Registration

- `GET /auth/google`
  Redirects users to Google’s OAuth 2.0 consent screen for authentication.

- `GET /auth/google/callback`
  Callback endpoint for Google to redirect after user consent. Handles user info retrieval and JWT token issuance.

---

## Projects

- `POST /projects`
  Create a new project.
  **Access:** Admin only.

- `PATCH /projects/:id`
  Update project metadata or assign/remove users to/from the project.
  **Access:** Admin only.

- `DELETE /projects/:id`
  Delete a project by ID.
  **Access:** Admin only.

---

## Tasks

- `GET /tasks`
  Retrieve all non-private tasks of a project.
  _Supports filtering by project ID, status, assigned worker, and pagination._

- `POST /tasks`
  Create a new task.
  **Access:** Admin only.

- `PATCH /tasks/:id`
  Update task details.
  **Access:** Admin only.

- `DELETE /tasks/:id`
  Delete a task by ID.
  **Access:** Admin only.

---

## Users

- `GET /users`
  Retrieve a list of all users.
  **Access:** Admin only.

- `GET /users/project/:projectId`
  Retrieve all users assigned to a specific project.
  **Access:** Project owner or Admin.

- `GET /users/me`
  Retrieve the authenticated user’s profile details.
  **Access:** Authenticated user.

- `DELETE /users/:id`
  Delete a user by ID.
  **Access:** Admin only.

---

# Database Design

Refer to the [TaskSphere Database Diagram](https://dbdiagram.io/e/67da49e875d75cc8449e7263/689ae7881d75ee360a2b6507) for the detailed schema.

---
