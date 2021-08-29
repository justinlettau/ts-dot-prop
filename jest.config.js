module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  collectCoverage: true,
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: ['/node_modules/(?!ts-util-is)'],
};
