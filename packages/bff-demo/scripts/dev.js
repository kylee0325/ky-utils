const { execSync } = require('child_process');
const path = require('path');

console.log('启动 render 服务中...');
execSync('rm -rf dist && tsc');
execSync('tsc -w & nodemon -e js,ts -w dist -w .env  --exec "node --inspect dist/bootstrap" ', {
    pwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
});
