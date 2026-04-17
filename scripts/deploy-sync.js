const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'frontend', 'dist');
const destDir = path.join(__dirname, '..', 'dist');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log(`🚀 Starting deployment sync from ${srcDir} to ${destDir}...`);

try {
  if (fs.existsSync(srcDir)) {
    // Clear old dist if exists
    if (fs.existsSync(destDir)) {
      console.log('🧹 Clearing old root dist...');
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    
    // Copy new build
    copyRecursiveSync(srcDir, destDir);
    console.log('✅ Success! Build files synced to root dist.');
  } else {
    console.error(`❌ Build failure: Source directory ${srcDir} does not exist. Did the build run?`);
    process.exit(1);
  }
} catch (err) {
  console.error('❌ Sync failed:', err);
  process.exit(1);
}
