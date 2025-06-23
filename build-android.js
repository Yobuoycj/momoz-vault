const fs = require('fs');
const { execSync } = require('child_process');

// Copy Cordova config
fs.copyFileSync('cordova.xml', 'cordova/config.xml');

// Build React app
execSync('npm run build', { stdio: 'inherit' });

// Prepare Cordova
execSync('npm run cordova-prepare', { stdio: 'inherit' });

console.log('Android project prepared. Run:');
console.log('cd cordova && cordova build android');