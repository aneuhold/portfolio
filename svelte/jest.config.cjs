module.exports = {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true
      }
    ],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^config/(.*)$': '<rootDir>/_shared-config/$1'
  }
};
