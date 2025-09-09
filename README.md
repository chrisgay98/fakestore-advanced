# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## CI / CD and Testing

This project includes a GitHub Actions workflow at `.github/workflows/ci-cd.yml` that runs on pushes to `main`. The workflow installs dependencies, runs tests, and can be extended to deploy to Vercel.

Local commands
- Install dependencies: `npm ci`
- Run tests: `npm test`
- Run a single test file: `npx jest test/CartFlow.test.tsx -i`

Notes about tests
- Global jest matchers are loaded from `test/setupTests.ts` (`@testing-library/jest-dom`).
- Use `renderUI` from `test/test-utils.tsx` to render components in tests (it wraps the app `store` and React Query).
- Static asset imports are mocked via `test/__mocks__/fileMock.js`.

Vercel deployment (optional)
- To enable automatic Vercel deployments from Actions, add the following repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
- After deployment, add the live site URL here:

Live site: <PASTE_VERCEL_URL_HERE>

## Enabling automatic Vercel deployment from GitHub Actions

The workflow includes a `deploy` job that requires three repository secrets to authenticate with Vercel:

- `VERCEL_TOKEN` — your personal Vercel token (Account Settings → Tokens).
- `VERCEL_ORG_ID` — your Vercel organization ID (found in project settings or Vercel dashboard URL).
- `VERCEL_PROJECT_ID` — your Vercel project ID (found in project settings or via the Vercel CLI).

How to add secrets (GitHub):

1. Go to your repository on GitHub → Settings → Secrets and variables → Actions.
2. Click "New repository secret" and add each secret above.
3. After adding secrets, push to `main` to trigger the workflow; the `deploy` job will run only if the `test_build` job succeeds.

I won't add secrets for you — please add them through the GitHub web UI because they are sensitive. Once added, the workflow will deploy automatically on pushes to `main`.
