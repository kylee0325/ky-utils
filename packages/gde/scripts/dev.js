const execa = require('execa');

async function init() {
    await execa.command('npx lerna run compile --stream', {
        stdio: 'inherit',
    });
}
async function watch() {
    execa.command('npx lerna run watch --stream --scope=@gde/utils', {
        stdio: 'inherit',
    });
    execa.command('npx lerna run watch --stream --scope=@gde/compositions', {
        stdio: 'inherit',
    });
    execa.command('npx lerna run watch --stream --scope=@gde/ui', {
        stdio: 'inherit',
    });
}

async function start() {
    await execa.command('yarn docs:dev', {
        stdio: 'inherit',
    });
}

async function run() {
    await init();
    watch();
    start();
}

run();
