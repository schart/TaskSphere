📘 Read this in: [🇹🇷 ](./READMETR.md) | [🇬🇧 English](./README.md)

### 🧭 TaskSphere – Task Management System

TaskSphere is a personal project and task management platform built with a clean, secure, and modular **NestJS** architecture.  
It allows each user to manage their own project and organize tasks efficiently.

---

### ⚙️ Tech Stack

| Layer                           | Technology                                       |
| ------------------------------- | ------------------------------------------------ |
| **Backend Framework**           | [NestJS](https://nestjs.com/) (TypeScript)       |
| **ORM / Database**              | [Sequelize](https://sequelize.org/) + PostgreSQL |
| **Authentication**              | JWT (Server-side token management)               |
| **Documentation**               | Compodoc                                         |
| **Testing**                     | Jest (planned)                                   |
| **Runtime Env**                 | Node.js v18+                                     |
| **Containerization (optional)** | Docker                                           |

---

### 🧱 Application Layers

- **Controller** → Handles HTTP routes (`/project`, `/task`)
- **Service** → Contains business logic and data flow
- **Repository** → Manages database operations (Sequelize)
- **Entity (Model)** → Represents database tables
- **Guard** → Handles authentication and authorization

---

### 🧠 Main Flow

1. The user registers or logs in.
2. The JWT token is managed **server-side**.
3. A user can create **only one project** at a time.
4. The user can add, complete, or delete tasks within their project.
5. All routes are protected by guards (`GuardJwtAuth`, `GuardShouldBeOwnerOfReq`).

---

### ⚖️ Business Rules (Domain Logic)

#### 👤 User

- A user cannot register twice with the same email.
- When a user is deleted, all their projects and tasks are removed as well.

#### 🧱 Project

- Each user can own **only one project**.
- If a project already exists, return `409 Conflict`.
- Projects can be updated or deleted only by their owner.
- Deleting a project cascades and removes related tasks.

#### 🗒️ Task

- Each task must belong to a project.
- Tasks can be created only by the project owner.
- Task states: `pending`, `done`.
- Only the project owner can modify or delete tasks.

#### 🔐 Security

- All requests are protected by `GuardJwtAuth`.
- Ownership is enforced by `GuardShouldBeOwnerOfReq`.
- Tokens are verified **server-side** (no localStorage usage).

---

### 🗄️ Database Structure

```
User (1) ─── (1) Project (1) ─── (*) Task
```

| Entity      | Field                                     | Type  |
| ----------- | ----------------------------------------- | ----- |
| **User**    | id, email, password                       | PK    |
| **Project** | id, ownerId (FK→User), title, description | PK+FK |
| **Task**    | id, projectId (FK→Project), title, status | PK+FK |

---

### 🧭 Future Enhancements

- Multi-project support (1 user → N projects)
- Team collaboration and shared access
- Task comments and attachments
- Real-time updates via WebSockets
- Automated testing and CI/CD integration

---

### 🚀 Running Locally

```bash
# Install dependencies
npm install

# Configure your environment file
# cp .env.example .env

# Start development server
npm run start:dev

http://localhost:3000/
```

---

### 📘 License

## MIT © 2025 Heja Arslan
