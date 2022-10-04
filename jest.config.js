module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  rootDir: 'src',
  moduleNameMapper: {
    '^@data/(.*)$': '<rootDir>/data/$1',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@main/(.*)$': '<rootDir>/main/$1',
    '^@presentation/(.*)$': '<rootDir>/presentation/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
}
