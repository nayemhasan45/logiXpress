# Repository Guidelines

## Project Structure & Module Organization
- `src/` hosts all React code; pages live in `src/pages`, layouts in `src/layouts`, shared hooks in `src/hooks`, and the auth context in `src/context/authContext`.
- Static assets, Tailwind configs, and JSON fixtures sit under `src/assets`, while `public/` holds the Vite HTML shell and global static files.
- The Express API resides in `../logiXpress_server/index.js`; create helpers or route modules inside sibling folders like `routes/` or `db/` when logic grows.
- Build artifacts output to `dist/`; keep secrets in `.env.local` (client) and `../logiXpress_server/.env` (server).

## Build, Test, and Development Commands
- `npm run dev` — starts the Vite dev server with React Fast Refresh at `http://localhost:5173`.
- `npm run build` — bundles the client using Vite and Tailwind, emitting optimized assets to `dist/`.
- `npm run preview` — serves the production build for smoke testing.
- `npm run lint` — runs the flat ESLint config defined in `eslint.config.js`.
- `node ../logiXpress_server/index.js` or `PORT=5000 node ...` — boots the Express API after loading `.env`.

## Coding Style & Naming Conventions
- Use functional React components with hooks, two-space indentation, and Tailwind/DaisyUI utilities before custom CSS.
- Components follow PascalCase (`CreateParcel.jsx`), hooks stay camelCase (`useAxios.jsx`), and keep related styles/assets next to components.
- Extend API access via the Axios wrapper in `src/hooks/useAxios.jsx` and central AuthProvider logic.

## Testing Guidelines
- No automated tests ship yet; run `npm run lint`, `npm run build`, and manual UI/API smoke checks before pushing.
- When adding coverage, colocate specs like `Dashboard.test.jsx`, use Vitest/Jest locally (`npx vitest run`), and target ≥80% for critical paths.
- Server integration tests belong under `../logiXpress_server/tests` using Supertest; document known gaps in PRs.

## Commit & Pull Request Guidelines
- Follow existing history: short, lowercase, imperative summaries that mention the surface (e.g., `docs add onboarding notes`).
- PRs should state motivation, enumerate key changes, link issues, and include screenshots or terminal output for UI/API updates.
- Confirm lint/build success and that both client and server run locally before requesting review.
- Note any environment changes (Firebase keys, Mongo URIs) and ensure `VITE_API_URL` matches the server CORS allowlist.
