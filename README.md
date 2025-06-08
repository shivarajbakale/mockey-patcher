# Redirector App

A Chrome extension with a backend service for managing URL redirections.

## 🚀 Quick Start (One Command)

Get everything up and running from a fresh clone:

```bash
yarn setup
```

This will:
1. Initialize and update all submodules
2. Install all dependencies
3. Start the backend API in a Docker container
4. Start PostgreSQL database in a container  
5. Start pgAdmin in a container
6. Show real-time logs

## 🚀 Alternative: Local Development

If you prefer to run the backend locally:

```bash
yarn install     # Install dependencies
yarn start       # Start with local backend
```

## 📦 Submodule Management

This project uses Git submodules for managing the Chrome extension and backend components. Here's how to work with them:

### Initial Setup
```bash
# Clone the main repository with submodules
git clone --recursive https://github.com/shivarajbakale/redirector-app.git

# Or if already cloned, initialize submodules
yarn submodule:init
```

### Updating Submodules
```bash
# Pull latest changes for all submodules
yarn submodule:pull

# Update submodules to their latest remote versions
yarn submodule:update
```

### Working with Submodules
1. Changes in submodules should be committed and pushed from their respective directories
2. After updating submodules, run `yarn build` to rebuild all packages
3. The main repository needs to be updated when submodule references change

## 📋 What Gets Started

After running `yarn setup`, you'll have:

- **Backend API**: Running in Docker container on `http://localhost:3000`
- **PostgreSQL Database**: Running in Docker container on `localhost:5432`
- **pgAdmin**: Web interface on `http://localhost:5050`
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
- `yarn start:docker` - **Start all services in Docker containers**
- `yarn logs` - View backend container logs
- `yarn down` - Stop all Docker containers

### Local Development
- `yarn setup` - Complete setup with submodules
- `yarn start` - Start with local backend
- `yarn dev` - Development mode with local backend
- `yarn build` - Build both chrome extension and backend

### Submodule Management
- `yarn submodule:init` - Initialize submodules
- `yarn submodule:update` - Update submodules to latest
- `yarn submodule:pull` - Pull latest changes for submodules

## 🛠️ Manual Setup (if needed)

If you need to set up components individually:

### Backend Setup (Docker)
```bash
cd packages/backend
npm run docker:up      # Start all containers
npm run docker:logs    # View logs
npm run docker:down    # Stop containers
```

### Backend Setup (Local)
```bash
cd packages/backend
npm run db:up          # Start Docker containers
npm run db:migrate     # Run database migrations
npm run db:generate    # Generate Prisma client
npm run dev           # Start development server
```

### Chrome Extension Setup
```bash
cd packages/chrome
yarn build         # Build for production
yarn dev          # Start development mode
```

## 🔄 Stopping Services

### Docker Services
```bash
yarn down  # Stop all Docker containers
```

### Local Services
1. Press `Ctrl+C` in the terminal running the backend
2. To stop Docker containers: `cd packages/backend && npm run db:down`

## 📚 Development

- **Backend**: Built with Node.js, Express, and Prisma ORM (fully containerized)
- **Database**: PostgreSQL running in Docker
- **Chrome Extension**: Built with Plasmo framework
- **Package Management**: Yarn workspaces

## 🐛 Troubleshooting

**Docker Issues:**
- Ensure Docker is running and has sufficient resources
- If containers fail to start: `yarn down` then `yarn start:docker`
- Check container logs: `yarn backend:docker:logs`

**Submodule Issues:**
- If submodules are empty: `yarn submodule:init`
- If submodules are outdated: `yarn submodule:update`
- For merge conflicts in submodules: Resolve in the submodule directory first

**Database connection issues:**
- Ensure Docker is running
- Check if port 5432 is available
- Try `yarn down` then restart with `yarn start:docker`

**Chrome extension not loading:**
- Check that the build completed successfully
- Load the extension from `packages/chrome/build/` in Chrome

**Backend not starting:**
- With Docker: Check `yarn backend:docker:logs` for errors
- With Local: Ensure all dependencies are installed and database is running 