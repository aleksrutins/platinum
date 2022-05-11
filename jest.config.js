/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['/lib/'],
  globals: {
    'ts-jest': {
      'useESM': true
    }
  }
};