#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Redirector App...\n');

function runCommand(command, description, options = {}) {
  console.log(`⏳ ${description}...`);
  try {
    execSync(command, {
      stdio: 'inherit',
      cwd: options.cwd || process.cwd(),
      ...options,
    });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    process.exit(1);
  }
}

// 1. Build Chrome Extension for Production
console.log('📦 Building Chrome Extension...');
runCommand('yarn chrome:build', 'Chrome extension build');

// 2. Setup Backend Environment
console.log('🐳 Setting up Backend Environment...');

// Check if backend directory exists
const backendPath = path.join(process.cwd(), 'packages', 'backend');
if (!fs.existsSync(backendPath)) {
  console.error('❌ Backend directory not found');
  process.exit(1);
}

// Start Docker containers
runCommand('yarn workspace backend db:up', 'Starting Docker containers');

// Wait for database to be ready
console.log('⏳ Waiting for database to be ready...');
let dbReady = false;
let attempts = 0;
const maxAttempts = 30;

while (!dbReady && attempts < maxAttempts) {
  try {
    execSync('docker exec redirector_postgres pg_isready -U postgres', { stdio: 'pipe' });
    dbReady = true;
    console.log('✅ Database is ready\n');
  } catch (error) {
    attempts++;
    console.log(`⏳ Waiting for database... (${attempts}/${maxAttempts})`);
    // Use synchronous sleep instead of async
    execSync('sleep 2', { stdio: 'pipe' });
  }
}

if (!dbReady) {
  console.error('❌ Database failed to start within timeout period');
  process.exit(1);
}

// Run database migrations and generate Prisma client
runCommand('yarn workspace backend db:migrate', 'Running database migrations');
runCommand('yarn workspace backend db:generate', 'Generating Prisma client');

// Build backend
runCommand('yarn workspace backend build', 'Building backend');

console.log('🎉 Setup completed successfully!');
console.log('📋 Summary:');
console.log('   • Chrome extension built for production');
console.log('   • PostgreSQL database container running on port 5432');
console.log('   • Database migrations applied');
console.log('   • Prisma client generated');
console.log('   • Backend compiled');
console.log('');
