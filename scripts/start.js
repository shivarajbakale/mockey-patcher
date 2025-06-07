#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Redirector App Backend...\n');

// Start the backend server
console.log('🌟 Starting backend server...');
console.log('📍 Backend will be available at: http://localhost:3000');
console.log('🗄️  Database (PostgreSQL) running on: localhost:5432');
console.log('🔧 pgAdmin available at: http://localhost:5050');
console.log('📱 Chrome extension build available in: packages/chrome/build\n');

console.log('🔄 Starting backend server...');

const backendProcess = spawn('yarn', ['workspace', 'backend', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  backendProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  backendProcess.kill('SIGTERM');
  process.exit(0);
});

backendProcess.on('close', code => {
  console.log(`\n🏁 Backend server exited with code ${code}`);
  process.exit(code);
});

backendProcess.on('error', error => {
  console.error('❌ Failed to start backend server:', error.message);
  process.exit(1);
});
