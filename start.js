const { spawn } = require('child_process');

// Detect if running in cloud production environment (e.g. Render, Railway)
const isProduction = process.env.NODE_ENV === 'production' || process.env.PORT || process.env.RENDER;

if (isProduction) {
  console.log('🚀 Cloud Production Environment Detected: Launching eKart Express Production Server...');
  require('./server.js');
} else {
  console.log('💻 Local Development Environment Detected: Launching Angular Dev Server (ng serve)...');
  const child = spawn('npx', ['ng', 'serve'], { stdio: 'inherit', shell: true });
  
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}
