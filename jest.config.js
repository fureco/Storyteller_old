const {defaults} = require('jest-config');

module.exports = {
    testPathIgnorePatterns: [
        ...defaults.testPathIgnorePatterns,
    ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
    ],
    setupFilesAfterEnv: ["<rootDir>enzyme.config.js"]
};