const {defaults} = require('jest-config');

module.exports = {
    testPathIgnorePatterns: [
        ...defaults.testPathIgnorePatterns,
        "/reducers/",
    ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
    ],
    setupFilesAfterEnv: ["<rootDir>enzyme.config.js"]
};