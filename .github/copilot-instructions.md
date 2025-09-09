Project orientation for AI coding agents — fakestore-advanced

Purpose
- Help an AI agent be immediately productive: tests, CI, build, and deployment for this React + TypeScript + Vite sample.

Quick facts (where to look)
- Tests and test helpers: `test/` (e.g. `test/setupTests.ts`, `test/test-utils.tsx`, `test/CategorySelect.test.tsx`).
- Jest config: `jest.config.cjs` (uses `babel-jest`, `jsdom`, and `setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"]`).
- Type augmentations: `src/types/jest.d.ts` (references `@testing-library/jest-dom`).
- Mocks for static assets: `test/__mocks__/fileMock.js` (images imported in components map here).
- Project README: `README.md` at repo root — contains ESLint and dev notes.
- GitHub Actions workflow: `.github/workflows/ci-cd.yml` (CI/CD pipeline entrypoint in this repo).

What you must know to work here
- Tests rely on `@testing-library/jest-dom` types and `test/setupTests.ts` to import matchers. Do not re-extend matchers inside individual tests — rely on the setup file.
- `renderUI` wraps components with `QueryClientProvider` (see `test/test-utils.tsx`); use it for rendering components in tests.
- Static assets (jpg/png/svg) are mapped to `test/__mocks__/fileMock.js` in `jest.config.cjs` — keep that mapping when adding tests that import images.
- TypeScript settings often include `jest` and `@testing-library/jest-dom` in tsconfig (check `tsconfig*.json` files). If types are missing, update `tsconfig` include or `types` array.

Developer workflows (explicit commands)
- Install deps: `npm ci` or `npm install` in repo root.
- Run all tests: `npm test` (project uses Jest via npm scripts).
- Run a single test file: `npx jest test/CartFlow.test.tsx` or `npx jest path/to/test -i` (interactive).
- Run linter/build locally following `README.md` instructions; Vite dev server is `npm run dev` if present.

CI/CD specifics for this codebase
- CI lives in `.github/workflows/ci-cd.yml`. Typical CI job should:
  - install dependencies (use `npm ci`),
  - run typecheck (if added),
  - run `npm test` and fail on test failures,
  - build (`npm run build`) before deployment.
- Deployment target: Vercel. The repo currently contains a workflow file; prefer using Vercel's GitHub integration or use the `vercel` CLI in a workflow step (requires `VERCEL_TOKEN` secret).
- Ensure deployment jobs only run after tests pass.

Project-specific patterns and conventions
- Tests sometimes include example/skipped specs (`test.skip(...)`) — leave them skipped until selectors/data are stable.
- Avoid importing `expect` from `@jest/globals` and then manually extending matchers inside test files; rely on `test/setupTests.ts` to provide `@testing-library/jest-dom` globally.
- Use `@/` alias for imports (mapped in `jest.config.cjs` and tsconfig): e.g. `@/api/fakestore` -> `src/api/fakestore`.

When editing or adding tests
- Use `renderUI` from `test/test-utils.tsx` so react-query contexts match production usage.
- Mock API calls using `jest.mock('@/api/fakestore', () => ({ api: { ... } }))` as tests already do.
- For DOM assertions prefer `findBy`/`findAllBy` or `waitFor` to handle async behavior.

Checklist for CI/CD/Presentation assignment (mapped to repo)
- Provide GitHub Actions workflow that runs `npm ci`, `npm test`, and `npm run build` (existing `.github/workflows/ci-cd.yml` is a starting point).
- Include at least two unit tests for distinct components and one integration test for cart flow (see `test/CartFlow.test.tsx` for a template; currently skipped).
- Ensure `test/setupTests.ts` imports `@testing-library/jest-dom` (already present).
- Add a README section with Vercel live link and CI notes (edit `README.md`).

Notes for the agent (rules of engagement)
- Run tests after any change. If tests pass locally, update the workflow only when necessary.
- If you change types or tsconfig, restart TS server or ensure CI runs type checks.
- When deploying to Vercel in CI, read the repository's `.github/workflows/ci-cd.yml` and prefer adding a protected deploy step that uses `VERCEL_TOKEN` and `VERCEL_ORG_ID/PROJECT_ID` secrets.

If something's missing
- If you cannot find `npm` scripts or CI credentials, ask the repo owner for:
  1) npm scripts to run build and start, 2) Vercel project token/IDs, 3) preferred node version.

Feedback
- I merged your CI/CD assignment notes into this guidance; tell me any project-specific wording you want preserved (replace|append) and I will update the file.
