module.exports = {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester'
    ],
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true
      }
    ],
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  extensionsToTreatAsEsm: ['.svelte', '.ts'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^config/(.*)$': '<rootDir>/_shared-config/$1'
  }
};
