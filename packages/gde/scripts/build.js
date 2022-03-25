const execa = require('execa');

async function watch() {
    await execa.command('npx lerna run compile', {
        stdio: 'inherit',
    });
}

async function start() {
    await execa.command('yarn docs:build', {
        stdio: 'inherit',
    });
}

async function run() {
    await watch();
    start();
}

run();
