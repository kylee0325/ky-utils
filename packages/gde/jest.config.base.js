const path = require('path');

const resolveRoot = (arg) => path.resolve(__dirname, arg);

module.exports = {
    rootDir: __dirname,
    testEnvironment: 'jsdom',
    setupFiles: ['jest-canvas-mock', resolveRoot('tests/unit/setup.js')],
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest',
        '^.+\\.vue$': '@vue/vue2-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '!**/lib/**'],
    testPathIgnorePatterns: ['/.history/', '/node_modules/', '/tests/'],
    transformIgnorePatterns: ['node_modules/(?!@gaoding/gd-antd)'],
};
