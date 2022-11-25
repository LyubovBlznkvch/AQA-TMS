/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/API/**/*.test.ts'],
    testRunner: 'jest-jasmine2',
    setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  };