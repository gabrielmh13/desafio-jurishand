/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: "integration",
    testMatch: ["**/__tests__/**/integration/**/*.[jt]s?(x)"],
};