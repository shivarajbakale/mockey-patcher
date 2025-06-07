# Redirector Backend API

A Node.js/Express backend service that provides API endpoints for the Redirector Chrome extension. Built with TypeScript, Prisma ORM, and PostgreSQL for managing URL redirection rules.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for redirection rules
- **Database Management**: PostgreSQL with Prisma ORM
- **Docker Integration**: Containerized database setup
- **CORS Support**: Cross-origin resource sharing for browser extension
- **Development Tools**: Hot reloading with Nodemon
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- Node.js with TypeScript
- Express.js
- PostgreSQL (Docker)
- Prisma ORM
- CORS, Morgan (logging), Cookie Parser
- Nodemon for hot reloading

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start database and setup:**
   ```bash
   npm run setup
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Server will be available at `http://localhost:3000`

## 🗄️ Database

PostgreSQL running in Docker:
- **Database**: `redirector_db`
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: `password`


## 👨‍💻 Author

**Shivaraj Bakale**

---

For Chrome extension setup and usage, see the [Chrome extension README](../chrome/README.md).
