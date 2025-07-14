# Mockey Patcher - API Request Mocking System

A comprehensive Chrome extension with backend service for intelligent API request mocking, real-time network monitoring, and seamless development workflows.

## 🚀 Quick Start

```bash
yarn setup    # Complete setup with Docker containers
yarn start    # Start all services
```

## 🌐 Project Website

Visit our [GitHub Pages site](https://shivarajbakale.github.io/mockey-patcher/) for more information about Mockey Patcher, including:
- Detailed feature overview
- System architecture diagrams
- Installation instructions
- Privacy policy

## 🏗️ How It Works

![High-Level Workflow](./assets/diagram.png)

## 🏛️ Technical Architecture

![System Architecture](./assets/mermaid.png)

## 📋 Core Components

### Chrome Extension (`packages/chrome/`)
- **Background Script**: Manages Chrome APIs and message routing
- **DevTools Panel**: Real-time network monitoring and request capture
- **Dashboard Tab**: Full-featured interface for managing mocks and groups

### Backend Service (`packages/backend/`)
- **REST API**: Node.js/Express server for data management
- **Database**: PostgreSQL with Prisma ORM
- **CLI Tools**: Command-line interface for service management
- **Docker Setup**: Containerized deployment

## 🔄 Workflow

1. **Capture**: Extension monitors network requests in DevTools
2. **Store**: Requests are saved to PostgreSQL database via REST API
3. **Mock**: Create mock responses for captured requests
4. **Group**: Organize related requests into logical groups
5. **Activate**: Enable/disable mocks using Chrome's redirect rules
6. **Intercept**: Chrome redirects matching requests to mock responses

## 📦 What Gets Started

After running `yarn setup`:

- **Backend API**: `http://localhost:3000`
- **PostgreSQL Database**: `localhost:5432`
- **pgAdmin Interface**: `http://localhost:5050`
  - Email: `admin@admin.com`
  - Password: `admin`
- **Chrome Extension**: Build available in `packages/chrome/build/`

## 🏗️ Project Structure

```
redirector-app/
├── packages/
│   ├── chrome/          # Chrome extension (Git submodule)
│   └── backend/         # Node.js backend (Git submodule)
├── scripts/             # Setup and start scripts
└── package.json         # Root workspace configuration
```

## 🔧 Available Scripts

### Docker Commands (Recommended)
- `yarn start:docker` - Start all services in Docker containers
- `yarn logs` - View backend container logs
- `yarn down` - Stop all Docker containers

### Local Development
- `yarn setup` - Complete setup with submodules
- `yarn start` - Start with local backend
- `yarn dev` - Development mode
- `yarn build` - Build all packages

### Submodule Management
- `yarn submodule:init` - Initialize submodules
- `yarn submodule:update` - Update submodules to latest
- `yarn submodule:pull` - Pull latest changes

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Plasmo Framework
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **Infrastructure**: Docker, Docker Compose
- **State Management**: Zustand
- **UI Components**: Radix UI, Shadcn/ui

## 🎯 Key Features

- **Real-time Network Monitoring**: Capture HTTP requests in DevTools
- **Intelligent Mocking**: Create and manage mock responses
- **Group Management**: Organize requests into logical groups
- **Volatile Parameter Handling**: Smart URL pattern matching
- **Persistent Storage**: PostgreSQL database with full CRUD operations
- **Context Menu Integration**: Quick access from any page
- **CLI Management**: Command-line tools for service control

## 🐛 Troubleshooting

**Docker Issues:**
- Ensure Docker is running: `yarn down` then `yarn start:docker`
- Check logs: `yarn logs`

**Submodule Issues:**
- Empty submodules: `yarn submodule:init`
- Outdated submodules: `yarn submodule:update`

**Database Issues:**
- Ensure port 5432 is available
- Check pgAdmin at `http://localhost:5050`

## 👨‍💻 Author

**Shivaraj Bakale** - shivarajapple@gmail.com 