# Redirector App

A Chrome extension with a backend service for managing URL redirections.

## 🚀 Quick Start (Turn-Key Setup)

Get everything up and running with a single command:

```bash
npm run setup
```

This will:
1. Initialize and update all submodules
2. Install all dependencies
3. Build all packages
4. Start the application

## 📦 Submodule Management

This project uses Git submodules for managing the Chrome extension and backend components. Here's how to work with them:

### Initial Setup
```bash
# Clone the main repository with submodules
git clone --recursive https://github.com/YOUR_USERNAME/redirector-app.git

# Or if already cloned, initialize submodules
npm run submodule:init
```

### Updating Submodules
```bash
# Pull latest changes for all submodules
npm run submodule:pull

# Update submodules to their latest remote versions
npm run submodule:update
```

### Working with Submodules
1. Changes in submodules should be committed and pushed from their respective directories
2. After updating submodules, run `npm run build` to rebuild all packages
3. The main repository needs to be updated when submodule references change

## 📋 What Gets Started

After running `npm run start`, you'll have:

- **Chrome Extension**: Production build available in `packages/chrome/build/`
- **Backend API**: Running on `http://localhost:3000`
- **PostgreSQL Database**: Available on `localhost:5432`
- **pgAdmin**: Web interface on `http://localhost:5050`
  - Email: `admin@admin.com`
  - Password: `admin`

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

- `npm run setup` - **Complete setup with submodules** (recommended)
- `npm run start` - Start the application
- `npm run dev` - Development mode for both chrome and backend
- `npm run build` - Build both chrome extension and backend
- `npm run submodule:init` - Initialize submodules
- `npm run submodule:update` - Update submodules to latest
- `npm run submodule:pull` - Pull latest changes for submodules

## 🛠️ Manual Setup (if needed)

If you need to set up components individually:

### Backend Setup
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
npm run build         # Build for production
npm run dev          # Start development mode
```

## 🔄 Stopping Services

To stop all services:
1. Press `Ctrl+C` in the terminal running the backend
2. To stop Docker containers: `cd packages/backend && npm run db:down`

## 📚 Development

- **Backend**: Built with Node.js, Express, and Prisma ORM
- **Database**: PostgreSQL running in Docker
- **Chrome Extension**: Built with Plasmo framework
- **Package Management**: Yarn workspaces

## 🐛 Troubleshooting

**Submodule Issues:**
- If submodules are empty: `npm run submodule:init`
- If submodules are outdated: `npm run submodule:update`
- For merge conflicts in submodules: Resolve in the submodule directory first

**Database connection issues:**
- Ensure Docker is running
- Check if port 5432 is available
- Try `npm run db:reset` to reset the database

**Chrome extension not loading:**
- Check that the build completed successfully
- Load the extension from `packages/chrome/build/` in Chrome

**Backend not starting:**
- Ensure all dependencies are installed: `yarn install`
- Check that the database is running and migrations are applied 