/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: "unit",
    testMatch: ["**/__tests__/**/unit/**/*.[jt]s?(x)"],
};