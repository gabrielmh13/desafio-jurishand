/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    "./jest.unit.config.js",
    "./jest.integration.config.js"
  ],
};