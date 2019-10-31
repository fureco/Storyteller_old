const {defaults} = require('jest-config');

module.exports = {
    testPathIgnorePatterns: [
        ...defaults.testPathIgnorePatterns,
    ],
    moduleFileExtensions: [
        ...defaults.moduleFileExtensions,
	],
	moduleNameMapper: {
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/__mocks__/fileMock.js",
		"\\.(css|less)$": "<rootDir>/config/__mocks__/styleMock.js"
	},
    setupFilesAfterEnv: ["<rootDir>enzyme.config.js"]
};
