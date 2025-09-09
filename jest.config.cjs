// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(t|j)sx?$": "babel-jest" },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg|gif|webp)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/main.tsx", "!src/vite-env.d.ts"],
};
