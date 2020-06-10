// eslint-disable-next-line no-undef
module.exports = {
  projects: [
    {
      globals: {
        "ts-jest": {
          tsConfig: "<rootDir>/packages/client/tsconfig.json",
        },
      },
      transform: {
        "^.+\\.tsx?$": "ts-jest",
      },
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/packages/client/src/setup-test.ts"],
      collectCoverageFrom: [
        "<rootDir>/packages/client/**/*.{ts,tsx}",
        "!**/node_modules/**",
      ],
      testMatch: ["<rootDir>/packages/client/**/?(*.)+(spec|test).ts?(x)"],
      moduleNameMapper: {
        "src/(.*)": "<rootDir>/packages/client/src/$1",
      },
    },
  ],
};
