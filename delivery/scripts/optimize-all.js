const { execSync } = require('node:child_process');
const path = require('node:path');
const process = require('node:process');

// 子プロセスを順番に実行
function run(command) {
  execSync(command, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
}

function main() {
  const scriptsDir = path.resolve('scripts');
  run(`node "${path.join(scriptsDir, 'optimize-images.js')}"`);
  run(`node "${path.join(scriptsDir, 'convert-videos.js')}"`);
  console.log('✅ Media optimization complete!');
}

try {
  main();
} catch (error) {
  console.error('[error] optimize-all encountered a fatal error');
  console.error(error);
  process.exitCode = 1;
}
