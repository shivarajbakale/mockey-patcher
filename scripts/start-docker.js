#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🐳 Starting Redirector App with Docker...\n');

// Start the backend server in Docker
console.log('🌟 Starting containerized backend server...');
console.log('📍 Backend will be available at: http://localhost:3000');
console.log('🗄️  Database (PostgreSQL) running on: localhost:5432');
console.log('🔧 pgAdmin available at: http://localhost:5050');
console.log('📱 Chrome extension build available in: packages/chrome/build\n');

console.log('🔄 Starting Docker containers...');

const backendProcess = spawn('yarn', ['workspace', 'backend', 'docker:up'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

// Wait a moment for containers to start, then show logs
setTimeout(() => {
  console.log('\n📋 To view backend logs, run: yarn backend:docker:logs');
  console.log('🛑 To stop all containers, run: yarn down\n');

  // Optionally start showing logs after containers are up
  console.log('🔍 Starting to show backend logs...\n');

  const logsProcess = spawn('yarn', ['workspace', 'backend', 'docker:logs'], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd(),
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down containers...');
    logsProcess.kill('SIGINT');

    // Stop the containers
    const stopProcess = spawn('yarn', ['workspace', 'backend', 'docker:down'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });

    stopProcess.on('close', () => {
      console.log('✅ Containers stopped successfully');
      process.exit(0);
    });
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down containers...');
    logsProcess.kill('SIGTERM');

    // Stop the containers
    const stopProcess = spawn('yarn', ['workspace', 'backend', 'docker:down'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });

    stopProcess.on('close', () => {
      console.log('✅ Containers stopped successfully');
      process.exit(0);
    });
  });
}, 3000);

backendProcess.on('close', code => {
  console.log(`\n🏁 Docker containers started with code ${code}`);
});

backendProcess.on('error', error => {
  console.error('❌ Failed to start Docker containers:', error.message);
  process.exit(1);
});
