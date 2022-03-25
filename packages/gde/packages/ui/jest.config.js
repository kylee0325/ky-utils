const baseConfig = require('../../jest.config.base');
const path = require('path');

module.exports = {
    ...baseConfig,
    rootDir: path.resolve(__dirname),
};
