# Redirector Backend API

A Node.js/Express backend service that provides API endpoints for the Redirector Chrome extension. Built with TypeScript, Prisma ORM, and PostgreSQL for managing URL redirection rules.

## 🚀 Features

- **RESTful API**: Complete CRUD operations for redirection rules
- **Database Management**: PostgreSQL with Prisma ORM
- **Docker Integration**: Fully containerized with Docker Compose
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

## 🚀 Quick Setup (Docker)

1. **Start all services (recommended):**
   ```bash
   npm run docker:up
   ```
   This starts the backend, database, and pgAdmin in containers.

2. **View logs:**
   ```bash
   npm run docker:logs
   ```

## 🚀 Alternative Setup (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start database only:**
   ```bash
   npm run db:up
   ```

3. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Start development server locally:**
   ```bash
   npm run dev
   ```

## 🗄️ Database

PostgreSQL running in Docker:
- **Database**: `redirector_db`
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: `password`

## 🔧 Available Scripts

### Docker Commands
- `npm run docker:up` - Start all services in containers
- `npm run docker:down` - Stop all containers
- `npm run docker:build` - Rebuild containers
- `npm run docker:logs` - View backend logs
- `npm run docker:restart` - Restart backend container

### Local Development
- `npm run dev` - Start development server locally
- `npm run start` - Start production server
- `npm run build` - Compile TypeScript to JavaScript
- `npm run db:up` - Start only database containers
- `npm run db:down` - Stop all containers
- `npm run setup` - Complete local setup

## 👨‍💻 Author

**Shivaraj Bakale**

---

For Chrome extension setup and usage, see the [Chrome extension README](../chrome/README.md).
